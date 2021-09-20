// I used such params to test it on windows
// ts-node src\hw3\Parser.ts "C:\Users\Anton\Desktop\Example.json"
import fs from 'fs'
import http from 'http'
import https from 'https'
import path from 'path'
import url from 'url'

interface IHttpGet {
    get(options: string | url.URL | http.RequestOptions, callback?: ((res: http.IncomingMessage) => void) | undefined): http.ClientRequest
}

export default function parse() {
    const jsonPath = getAndCheckPathFromArgs(process.argv.slice(2))
    const folderName = path.basename(jsonPath)
    const folderPath = createFolder(folderName)
    const buffer = fs.readFileSync(jsonPath, 'utf-8')
    parseContentAndWriteToFile(buffer, folderPath)
}

function getAndCheckPathFromArgs(argsArray: string[]): string {
    if (!argsArray) throw new Error('Args cannot be null')
    const jsonPath: string = argsArray[0]
    if (argsArray.length !== 1) throw new Error(`Not valid arguments. More than one param. Args: ${JSON.stringify(argsArray)}`)
    if (!fs.existsSync(jsonPath)) throw new Error(`No such file: ${jsonPath}`)
    return jsonPath
}

function parseContentAndWriteToFile(buffer: string, folderPath: string) {
    try {
        const array = JSON.parse(buffer) as string[]
        if (!array) throw new Error('Array with urls should not be empty')
        array.forEach(async (el) => {
            console.log(el)
            const address = new url.URL(el)
            const content = await getHtmlContentByUrl(address, getClient(el))
            writeContentToFile(content, path.join(folderPath, `${address.hostname}.html`))
        })
    } catch (e) {
        console.error(e)
    }
}

function getHtmlContentByUrl(url: url.URL, client: IHttpGet): Promise<string> {
    return new Promise((resolve, reject) => {
        client.get(url, (resp) => {
            let data: string = ''
            resp.on('data', (chunk) => {
                data += chunk
            })
            resp.on('end', () => {
                resolve(data)
            })
        }).on('error', (err) => {
            reject(err)
        })
    })
}

function getClient(url: string) {
    const httpClient: IHttpGet = http
    const httpsClient: IHttpGet = https
    return url.indexOf('https') === 0 ? httpsClient : httpClient
}

function createFolder(jsonFilename: string): string {
    const topLevelDir = path.join(__dirname, '..', '..', 'storage')
    const dir = path.join(topLevelDir, `${jsonFilename}_pages`)
    if (!fs.existsSync(topLevelDir)) {
        fs.mkdirSync(topLevelDir)
    }
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir)
    }
    return dir
}

function writeContentToFile(content: string, pathToFile: string) {
    fs.writeFile(pathToFile, content, function (err) {
        if (err) {
            return console.log(err)
        }
        console.log(`${pathToFile} was saved`)
    })
}

parse()
