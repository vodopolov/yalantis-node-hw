
type Item = { item: string, index: number }

export async function runSequentially<T>(
    arrayParam: T[],
    callback: (item: T, index: number) => Promise<Item>
) {
    const result: R[] = []
    for (let i = 0; i < arrayParam.length; i++) {
        result.push(await callback(arrayParam[i], i))
    }
    return result
}

async function main() {
    const arrayForTest: Array<string> = ["one", "two", "three"]

    const results = await runSequentially(arrayForTest, (item, index) => {
        return new Promise((resolve) => {
            setTimeout(resolve, 1000,
                {
                    item,
                    index,
                })
        })
    })
    console.log(JSON.stringify(results))
}

main()