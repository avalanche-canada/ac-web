export default function memoize(func) {
    return value => {
        if (!CACHE.has(value)) {
            CACHE.set(value, func(value))
        }

        return CACHE.get(value)
    }
}

const CACHE = new Map()
