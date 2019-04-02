import { useState, useEffect, useRef, useCallback } from 'react'
import throttle from 'lodash/throttle'
import identity from 'lodash/identity'
import { status } from 'services/fetch/utils'

export function useBoolean(initialValue) {
    const [value, set] = useState(initialValue)
    const activate = useCallback(() => {
        set(true)
    }, [])
    const deactivate = useCallback(() => {
        set(false)
    }, [])
    const reset = useCallback(() => {
        set(initialValue)
    }, [])
    function toggle() {
        set(!value)
    }

    return [value, activate, deactivate, toggle, reset, set]
}

export function useToggle(initialValue) {
    const state = useBoolean(initialValue)

    return [state[0], state[3]]
}

export function useTimeout(elapse = 0) {
    const [ready, setReady] = useBoolean(false)

    useEffect(() => {
        let timer = setTimeout(setReady, elapse)

        return () => {
            clearTimeout(timer)
        }
    }, [elapse])

    return ready
}

export function useWindowSize(wait = 250) {
    const [size, setSize] = useState(getWindowSize())
    const handleResize = useCallback(
        throttle(() => {
            setSize(getWindowSize())
        }, wait),
        [wait]
    )

    useEventListener('resize', handleResize)
    useEventListener('orientationchange', handleResize)

    return size
}

export function useEventListener(eventName, handler, element = window) {
    const savedHandler = useRef()

    useEffect(() => {
        savedHandler.current = handler
    }, [handler])

    useEffect(() => {
        if (element === null || !element.addEventListener) {
            return
        }

        function listener(event) {
            return savedHandler.current(event)
        }

        element.addEventListener(eventName, listener, false)

        return () => {
            element.removeEventListener(eventName, listener, false)
        }
    }, [eventName, element])
}

export function useFetch(request) {
    const { url } = request || {}
    const [data, setData] = useState(null)
    const [loading, loaded, unloaded] = useBoolean(false)
    const controller = useRef(null)

    useEffect(() => {
        if (!request) {
            return
        }

        try {
            controller.current = new AbortController()
        } catch (error) {
            controller.current = {
                abort() {},
            }
        }

        const { signal } = controller.current

        loaded()
        fetch(request, { signal })
            .then(status)
            .then(
                data => {
                    unloaded()
                    setData(data)
                },
                error => {
                    unloaded()
                    throw error
                }
            )

        return () => {
            if (loading) {
                controller.current.abort()
            }
        }
    }, [url])

    return [data, loading]
}

function useStorage(
    storage,
    key,
    defaultValue = null,
    decode = identity,
    encode = identity
) {
    const [value, setValue] = useState(() => {
        try {
            const value = storage.getItem(key)

            return value === null ? defaultValue : decode(value)
        } catch (error) {
            return defaultValue
        }
    })
    function listen(event) {
        if (event.storageArea === storage && event.key === key) {
            setValue(event.newValue)
        }
    }
    function set(value) {
        try {
            setValue(value)
            storage.setItem(key, encode(value))
        } catch (error) {}
    }
    function remove() {
        try {
            setValue(null)
            storage.removeItem(key)
        } catch (error) {}
    }

    // listening to changes
    useEventListener('storage', useCallback(listen, []))

    return [value, set, remove]
}

export function useLocalStorage(key, defaultValue, decode, encode) {
    return useStorage(window.localStorage, key, defaultValue, decode, encode)
}

export function useSessionStorage(key, defaultValue, decode, encode) {
    return useStorage(window.sessionStorage, key, defaultValue, decode, encode)
}

// Utils
function getWindowSize() {
    return {
        height: window.innerHeight,
        width: window.innerWidth,
    }
}
