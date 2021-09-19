export default function checkIfAnagram(first: string, second: string): boolean {
    const firstMap = extractMap(first)
    const secondMap = extractMap(second)
    return compareMaps(firstMap, secondMap)
}

function extractMap(str: string): Map<string, number> {
    const result: Map<string, number> = new Map<string, number>()
    for (let i = 0; i < str.length; i++) {
        const currentCounter = result.get(str.charAt(i))
        if (currentCounter) {
            result.set(str.charAt(i), currentCounter + 1)
        } else {
            result.set(str.charAt(i), 1)
        }
    }
    return result
}

function compareMaps(firstMap: Map<string, number>, secondMap: Map<string, number>): boolean {
    if (firstMap.size !== secondMap.size) return false
    let result = true
    firstMap.forEach(function (value, key) {
        if (!secondMap.has(key) || secondMap.get(key) !== value) { result = false }
    })
    return result
}
