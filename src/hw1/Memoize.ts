export default function memoize(fn: Function) {
  let cache = new Map<string, any>()

  return (...args: any[]) => {
    const cacheKey = JSON.stringify(args)

    if (!cache.has(cacheKey)) {
      console.log(`Cache does'n t have ${cacheKey}`)
      cache.set(cacheKey, fn(...args))
    }
    else {
      console.log(`Cache has ${cacheKey}. Result is: ${cache.get(cacheKey)}`)
    }

    return cache.get(cacheKey)
  }
}