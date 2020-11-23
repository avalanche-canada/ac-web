import * as React from 'react'
import throttle from 'lodash/throttle'
import { Local, Session } from 'services/storage'
import { captureMessage } from 'services/sentry'

export function useLazyRef(fn) {
    const ref = React.useRef(null)

    if (ref.current === null) {
        ref.current = fn()
    }

    return ref
}

export function useBoolean(initial) {
    const [bool, toggle] = useToggle(initial)
    const activate = React.useCallback(() => {
        toggle(true)
    }, [])
    const deactivate = React.useCallback(() => {
        toggle(false)
    }, [])
    const reset = React.useCallback(() => {
        toggle(initial)
    }, [])

    return [bool, activate, deactivate, toggle, reset]
}

export function useToggle(initial) {
    const [bool, set] = React.useState(initial)
    const toggle = React.useCallback(next => {
        if (typeof next === 'boolean') {
            set(next)
        } else {
            set(current => !current)
        }
    }, [])

    return [bool, toggle]
}

// TODO Improve that hook, the siganature should be the same as "setTimeout"
export function useTimeout(elapse = 0) {
    const [ready, setReady] = useBoolean(false)

    React.useEffect(() => {
        const timer = setTimeout(setReady, elapse)

        return () => {
            clearTimeout(timer)
        }
    }, [elapse])

    return ready
}

export function useWindowSize(wait = 250) {
    const [size, setSize] = useSafeState(getWindowSize())
    const handleResize = React.useCallback(
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
    React.useEffect(() => {
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

function useStorage(storage, key, defaultValue = null) {
    const [value, setValue] = React.useState(() =>
        storage.get(key, defaultValue)
    )

    React.useEffect(() => {
        storage.set(key, value)
    }, [value])

    return [value, setValue]
}

export function useLocalStorage(key, defaultValue) {
    return useStorage(Local, key, defaultValue)
}

export function useSessionStorage(key, defaultValue) {
    return useStorage(Session, key, defaultValue)
}

export function useCounter(
    initialCounter = 0,
    min = Number.MIN_SAFE_INTEGER,
    max = Number.MAX_SAFE_INTEGER,
    cycle = false
) {
    const [counter, setCounter] = React.useState(initialCounter)
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
    const [rect, setRect] = React.useState(initialRect)
    const node = React.useRef(null)
    const ref = React.useCallback(current => {
        if (current) {
            setRect(current.getBoundingClientRect())
            node.current = current
        }
    }, [])

    // FIXME Use ResizeObserver instead, but it requires a polyfill!
    React.useEffect(() => {
        if (node.current) {
            setRect(node.current.getBoundingClientRect())
        }
    }, [useWindowSize()])

    return [rect, ref]
}

export function useRatio(x = 16, y = 9) {
    const [rect, ref] = useClientRect()
    const dimensions = React.useMemo(() => {
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
    const ref = React.useRef(null)
    const enter = React.useCallback(() => {
        const { current } = ref

        if (!current || !document.fullscreenEnabled) {
            return
        }

        try {
            if (current.requestFullscreen) {
                current.requestFullscreen()
            } else if (current.mozRequestFullScreen) {
                current.mozRequestFullScreen()
            } else if (current.webkitRequestFullscreen) {
                current.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT)
            } else if (current.msRequestFullscreen) {
                current.msRequestFullscreen()
            }
        } catch (error) {
            captureMessage('Can not request Fullscreen. ' + error.message)
        }
    }, [ref.current])
    const exit = React.useCallback(() => {
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
    const toggle = React.useCallback(() => {
        getFullscreenElement() ? exit() : enter()
    }, [enter])

    return [ref, enter, exit, toggle, document.fullscreenEnabled]
}

export function useMounted() {
    const mounted = React.useRef(false)

    React.useEffect(() => {
        mounted.current = true

        return () => {
            mounted.current = false
        }
    }, [])

    return mounted
}

export function useScroll(ref) {
    const [position, setPosition] = React.useState([0, 0]) // Could set position after mounted
    const handler = React.useCallback(
        throttle(event => {
            const { scrollLeft, scrollTop } = event.target

            setPosition([scrollTop, scrollLeft])
        }, 250),
        []
    )

    useEventListener('scroll', handler, ref.current)

    return position
}

// Utils
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
    const mounted = useMounted()
    const [state, setState] = React.useState(initialState)
    const setStateSafely = React.useCallback(state => {
        if (mounted.current) {
            setState(state)
        }
    }, [])

    return [state, setStateSafely]
}

export function useCurrentPosition(options) {
    const [state, dispatch] = React.useReducer(positionReducer, {
        status: 'idle',
        longitude: null,
        latitude: null,
        error: null,
    })

    React.useEffect(() => {
        const { geolocation } = navigator

        if (!geolocation) {
            dispatch(['error', new Error('Geolocation is not supported.')])

            return
        }

        dispatch(['started'])
        geolocation.getCurrentPosition(
            payload => {
                dispatch(['success', payload])
            },
            error => {
                dispatch(['error', error])
            },
            options
        )
    }, [])

    return state
}

function positionReducer(state, [type, payload]) {
    switch (type) {
        case 'started':
            return {
                ...state,
                status: 'pending',
            }
        case 'success':
            return {
                ...state,
                status: 'resolved',
                longitude: payload.coords.longitude,
                latitude: payload.coords.latitude,
            }
        case 'error':
            return {
                ...state,
                status: 'rejected',
                error: payload,
            }
        default:
            return state
    }
}
