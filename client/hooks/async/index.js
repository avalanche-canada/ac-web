import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { Memory } from 'services/cache'

// TODO Big hack to clear cache for MIN reports once a new one got created.
export const CACHE = new Memory()

export function useAsync(fn, params = [], initialState) {
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
            .then(
                data => {
                    if (controller.current.signal?.aborted) {
                        return
                    }

                    setData(data)
                },
                error => {
                    setError(error)
                }
            )
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
    const [data, set, has] = useCache(key, initialState, lifespan)
    const func = useCallback(
        (...args) => {
            return has() ? Promise.resolve(data) : fn(...args)
        },
        [has, data, fn]
    )
    const values = useAsync(func, params, data)

    useEffect(() => {
        set(values[0])
    }, [values[0], set])

    return values
}

function useCache(key, initialState, lifespan) {
    const data = useMemo(() => CACHE.get(key, initialState), [key])
    const set = useCallback(
        data => {
            if (!data) {
                return
            }

            return CACHE.set(key, data, lifespan)
        },
        [key, lifespan]
    )
    const has = useCallback(() => CACHE.has(key), [key])

    return [data, set, has]
}

export function createKey(...paths) {
    return paths.filter(Boolean).join(':')
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
