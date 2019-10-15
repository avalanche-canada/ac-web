import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import throttle from 'lodash/throttle'
import identity from 'lodash/identity'
import { status } from 'services/fetch/utils'
import Memory from 'services/storage/Memory'
import { None } from 'components/fetch/Cache'

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
        const timer = setTimeout(setReady, elapse)

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
    useEffect(() => {
        if (
            element === null ||
            !element.addEventListener ||
            typeof handler !== 'function'
        ) {
            return
        }

        element.addEventListener(eventName, handler, false)

        return () => {
            element.removeEventListener(eventName, handler, false)
        }
    }, [eventName, element, handler])
}

export function useFetch(url, cache = new None()) {
    const [data, setData] = useSafeState(cache.get(url))
    const [pending, setPending] = useSafeState(
        PROMISES.has(url) || (Boolean(url) && !data)
    )
    const controller = useRef(null)
    function setError(error) {
        setData(() => {
            throw error
        })
    }
    function setupData(data) {
        setData(data)
        cache.set(url, data)
    }

    useEffect(() => {
        // Yes, url can be "null"
        if (!url || cache.has(url)) {
            return
        }

        if (PROMISES.has(url)) {
            const promise = PROMISES.get(url)

            promise
                .then(setupData)
                .catch(setError)
                .finally(() => {
                    setPending(false)
                })

            return
        }

        setPending(true)

        try {
            controller.current = new AbortController()
        } catch {
            controller.current = {
                abort() {},
            }
        }

        const { signal } = controller.current
        const promise = fetch(url, { signal }).then(status)

        promise
            .then(setupData)
            .catch(setError)
            .finally(() => {
                PROMISES.delete(url)

                setPending(false)
            })

        PROMISES.set(url, promise)

        return () => {
            if (!pending) {
                return
            }

            try {
                controller.current.abort()
            } catch (error) {
                if (error.name !== 'AbortError') {
                    setData(() => {
                        throw error
                    })
                }
            } finally {
                PROMISES.delete(url)

                setPending(false)
            }
        }
    }, [url])

    return [data, pending]
}

export function useAsync(fn, ...params) {
    const [data, setData] = useSafeState(null)
    const [pending, setPending] = useSafeState(false)

    async function caller() {
        try {
            setPending(true)

            setData(await fn.apply(null, params))
        } catch (error) {
            setData(() => {
                throw error
            })
        } finally {
            setPending(false)
        }
    }

    useEffect(() => {
        caller()
    }, [])

    return [data, pending]
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
        } catch {
            return defaultValue
        }
    })
    function listen(event) {
        if (event.storageArea === storage && event.key === key) {
            setValue(event.newValue)
        }
    }
    function set(value) {
        setValue(value)
        storage.setItem(key, encode(value))
    }
    function remove() {
        setValue(null)
        storage.removeItem(key)
    }

    // listening to changes
    useEventListener('storage', useCallback(listen, []))

    return [value, set, remove]
}

const MEMORY = new Memory()

export function useLocalStorage(
    key,
    defaultValue,
    decode = JSON.parse,
    encode = JSON.stringify
) {
    let storage

    // Chrome throws when storage are accessed from the global object
    try {
        storage = window.localStorage
    } catch {
        storage = MEMORY
    }

    return useStorage(storage, key, defaultValue, decode, encode)
}

export function useSessionStorage(
    key,
    defaultValue,
    decode = JSON.parse,
    encode = JSON.stringify
) {
    let storage

    // Chrome throws when storage are accessed from the global object
    try {
        storage = window.sessionStorage
    } catch {
        storage = MEMORY
    }

    return useStorage(storage, key, defaultValue, decode, encode)
}

export function useCounter(
    initialCounter = 0,
    min = Number.MIN_SAFE_INTEGER,
    max = Number.MAX_SAFE_INTEGER,
    cycle = false
) {
    const [counter, setCounter] = useState(initialCounter)
    function increment(step = 1) {
        const value = counter + step

        setCounter(value > max && cycle ? min : value)
    }
    function decrement(step = 1) {
        const value = counter - step

        setCounter(value < min && cycle ? max : value)
    }
    function first() {
        setCounter(min)
    }
    function last() {
        setCounter(max)
    }

    return [counter, increment, decrement, first, last]
}

export function useClientRect(initialRect) {
    const [rect, setRect] = useState(initialRect)
    const node = useRef(null)
    const ref = useCallback(current => {
        if (current) {
            setRect(current.getBoundingClientRect())
            node.current = current
        }
    }, [])

    // FIXME Use ResizeObserver instead, but it requires a polyfill!
    useEffect(() => {
        if (node.current) {
            setRect(node.current.getBoundingClientRect())
        }
    }, [useWindowSize()])

    return [rect, ref]
}

export function useRatio(x = 16, y = 9) {
    const [rect, ref] = useClientRect()
    const dimensions = useMemo(() => {
        if (!rect) {
            return null
        }

        const { width } = rect

        return {
            width: Math.round(width),
            height: Math.round(width * (y / x)),
        }
    }, [rect])

    return [dimensions, ref]
}

export function useFullscreen() {
    const ref = useRef(null)
    const enter = useCallback(() => {
        const { current } = ref

        if (current.requestFullscreen) {
            current.requestFullscreen()
        } else if (current.mozRequestFullScreen) {
            current.mozRequestFullScreen()
        } else if (current.webkitRequestFullscreen) {
            current.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT)
        } else if (current.msRequestFullscreen) {
            current.msRequestFullscreen()
        }
    }, [ref.current])
    const exit = useCallback(() => {
        if (!getFullscreenElement()) {
            return
        }

        if (document.exitFullscreen) {
            document.exitFullscreen()
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen()
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen()
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen()
        }
    }, [])
    const toggle = useCallback(() => {
        getFullscreenElement() ? exit() : enter()
    }, [enter])

    return [ref, enter, exit, toggle]
}

// Utils & constants
const PROMISES = new Map()
function getWindowSize() {
    return {
        height: window.innerHeight,
        width: window.innerWidth,
    }
}
function getFullscreenElement() {
    return (
        document.fullscreenElement ||
        document.mozFullScreenElement ||
        document.webkitFullscreenElement ||
        document.msFullscreenElement
    )
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
