export async function runSequentially<T, R>(
    arrayParam: T[],
    callback: (item: T, index: number) => Promise<R>
): Promise<R[]> {
    const result: R[] = []
    for (let i = 0; i < arrayParam.length; i++) {
        result.push(await callback(arrayParam[i], i))
    }
    return result
}

async function main() {
    const arrayForTest: Array<string> = ['one', 'two', 'three']

    const results = await runSequentially(arrayForTest, (item, index) => {
        return new Promise((resolve) => {
            setTimeout(resolve, 1000,
                {
                    item,
                    index
                })
        })
    })
    console.log(JSON.stringify(results))
}

main()
