import React, { useRef, useLayoutEffect, useState } from 'react'
import PropTypes from 'prop-types'
import throttle from 'lodash/throttle'

// TODO Should eventually get rid of these components and only use the hooks

Dimensions.propTypes = {
    children: PropTypes.func.isRequired,
}

export default function Dimensions({ children, ...props }) {
    const node = useRef()
    const [dimensions, setDimensions] = useState({
        width: null,
        height: null,
    })

    useDimensions(() => {
        setDimensions({
            width: node.current.offsetWidth,
            height: node.current.offsetHeight,
        })
    })

    return (
        <div {...props} ref={node}>
            {children(dimensions)}
        </div>
    )
}

Window.propTypes = {
    children: PropTypes.func.isRequired,
}

export function Window({ children }) {
    const [dimensions, setDimensions] = useState(getWindowDimensions())

    useDimensions(() => {
        setDimensions(getWindowDimensions())
    })

    return children(dimensions)
}

// Hooks
function useDimensions(listener) {
    listener = throttle(listener, 250)

    return useLayoutEffect(() => {
        listener()
        window.addEventListener('resize', listener, false)
        window.addEventListener('orientationchange', listener, false)

        return () => {
            window.removeEventListener('resize', listener)
            window.removeEventListener('orientationchange', listener)
        }
    }, [])
}

// Utils
function getWindowDimensions() {
    return {
        width: window.innerWidth,
        height: window.innerHeight,
    }
}
