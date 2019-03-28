import { useState, useEffect, useRef, useCallback } from 'react'
import throttle from 'lodash/throttle'
import { status } from 'services/fetch/utils'

export function useToggle(initialValue) {
    const [on, set] = useState(initialValue)

    return [
        on,
        () => {
            set(!on)
        },
    ]
}

export function useTimeout(elapse = 0) {
    const [ready, setReady] = useState(false)

    useEffect(() => {
        let timer = setTimeout(() => {
            setReady(true)
        }, elapse)

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
        if (!element.addEventListener) {
            return
        }

        function listener(event) {
            return savedHandler.current(event)
        }

        element.addEventListener(eventName, listener)

        return () => {
            element.removeEventListener(eventName, listener)
        }
    }, [eventName, element])
}

export function useFetch(request) {
    const { url } = request || {}
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
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

        setLoading(true)
        fetch(request, { signal })
            .then(status)
            .then(
                data => {
                    setLoading(false)
                    setData(data)
                },
                error => {
                    setLoading(false)
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

// Utils
function getWindowSize() {
    return {
        height: window.innerHeight,
        width: window.innerWidth,
    }
}
