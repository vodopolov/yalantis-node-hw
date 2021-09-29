import os from 'os'
import systeminformation from 'systeminformation'

export default async function scheduleInfoOutput() {
    const interval = getIntervalFromArgs(process.argv.slice(2))
    console.log(`Info output started with interval ${interval} seconds`)
    setInterval(() => { printMessage() }, interval * 1000)
}

function getIntervalFromArgs(argsArray: string[]): number {
    if (!argsArray) throw new Error('Args cannot be null')
    if (!isNumeric(argsArray[0])) throw new Error(`Arg not numeric: ${argsArray[0]}`)
    const intervalValue: number = parseInt(argsArray[0])
    if (intervalValue <= 0) throw new Error(`Interval must be more than 0. Current: ${argsArray[0]}`)
    return intervalValue
}

function isNumeric(value: string) {
    return /^\d+$/.test(value)
}

function printMessage() {
    console.log(`- operating system: ${os.platform()}`)
    console.log(`- architecture: ${os.arch()}`)
    console.log(`- current user name: ${os.userInfo().username}`)
    printCpuInfo()
    systeminformation.cpuTemperature().then(cpuTemperature => {
        console.log(`- cpu temperature: ${cpuTemperature.main}`)
    })
    printGpuInfo()
    printMemInfo()
    printBatteryInfo()
}

function printCpuInfo() {
    console.log('- cpu cores models:')
    const cpus = os.cpus()
    cpus.forEach(cpu => {
        console.log(`    ~ ${cpu.model}`)
    })
}

function printMemInfo() {
    const bytesToGb = 1000000000
    const total = Math.round(os.totalmem() / bytesToGb)
    const free = Math.round(os.freemem() / bytesToGb)
    const used = total - free
    console.log(`- total memory: ${total}GB, used memory: ${used}GB, free memory: ${free}GB`)
}

function printGpuInfo() {
    systeminformation.graphics().then(gi => {
        console.log('- graphic controllers vendors and models:')
        gi.controllers.forEach(controller => {
            console.log(`    ~ vendor: ${controller.vendor}, model: ${controller.model}`)
        })
    })
}

function printBatteryInfo() {
    systeminformation.battery(info => {
        if (info.hasBattery) {
            console.log('- battery info: ')
            console.log(`    ~ charging: ${info.isCharging}`)
            console.log(`    ~ percent: ${info.percent}`)
            console.log(`    ~ remaining time: ${info.timeRemaining}`)
        }
    })
}

scheduleInfoOutput()
