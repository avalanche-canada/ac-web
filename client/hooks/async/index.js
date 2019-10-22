import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { Memory } from 'services/cache'

export function useAsync(fn, params = [], initialState) {
    // TODO Look to see if using a "useReducer" will be faster! Update everything at once!
    const [data, setData] = useSafeState(initialState)
    const [pending, setPending] = useSafeState(true)
    const [error, setError] = useSafeState(null)
    const controller = useRef(null)

    useEffect(() => {
        setPending(true)

        // This way, we know it is the first render and we are not screwing the "initialState"
        if (controller.current) {
            setData(undefined)
            setError(null)
        }

        controller.current = createAbortController()

        fn.apply(null, [...params, controller.current.signal])
            .then(data => {
                if (controller.current.signal?.aborted) {
                    return
                }

                setData(data)
            })
            .catch(error => {
                setError(error)
            })
            .finally(() => {
                setPending(false)
            })

        return () => {
            controller.current.abort()
        }
    }, params)

    return [data, pending, error]
}

export function useCacheAsync(fn, params = [], initialState, key, lifespan) {
    const func = CACHE.has(key)
        ? () => Promise.resolve(CACHE.get(key))
        : (...args) =>
              fn.apply(null, args).then(data => {
                  //   console.warn('set cache', key, data)
                  CACHE.set(key, data, lifespan)

                  return data
              })

    return useAsync(func, params, initialState)
}

// Cache
// TODO Big hack to clear cache for MIN reports once a new one got created.
export const CACHE = new Memory()

// Utils
export function createKey(...paths) {
    return paths
        .flat() // Because you can pass arrays, see forecast hooks!
        .filter(Boolean)
        .join(':')
}

function createAbortController() {
    try {
        return new AbortController()
    } catch {
        return {
            abort() {},
        }
    }
}
function useSafeState(initialState) {
    const [state, unsafeSetState] = useState(initialState)
    const mounted = useRef(true)
    const setState = useCallback(value => {
        if (mounted.current) {
            unsafeSetState(value)
        }
    }, [])

    useEffect(
        () => () => {
            mounted.current = false
        },
        []
    )

    return [state, setState]
}
