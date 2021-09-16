function arrayMutateRemove<T>(array: Array<T>, predicate: (item: T) => boolean): Array<T> {
    const removedElements: T[] = [],
        removedElementsIds: number[] = []
    array.filter((item, index) => {
        if (predicate(item)) {
            return true
        }
        else {
            removedElements.push(item)
            removedElementsIds.push(index)
            return false
        }
    })
    removeItemsByIds(array, removedElementsIds)
    return removedElements
}

function removeItemsByIds<T>(array: T[], indexes: number[]): void {
    for (let i = indexes.length - 1; i >= 0; i--) {
        array.splice(indexes[i], 1)
    }
}

function main(): void {
    const arrayForTest: Array<number> = [1, 2, 3, 6, 7, 9]
    const removedElements = arrayMutateRemove(arrayForTest, (item) => item % 2 === 0)
    console.log(JSON.stringify(arrayForTest))
    console.log(JSON.stringify(removedElements))

    const arrayOfStrings: Array<string> = ['', 'Lorem', 'ipsum', '', 'dolor', 'sit']
    const removedStrings = arrayMutateRemove(arrayOfStrings, (item) => !!item)
    console.log(JSON.stringify(arrayOfStrings))
    console.log(JSON.stringify(removedStrings))
}

main()