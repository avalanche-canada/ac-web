import React, { useRef, useLayoutEffect, useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import throttle from 'lodash/throttle'
import { useEventListener } from 'utils/react'

// TODO Should eventually get rid of these components and only use the hooks + ResizeObserver

Dimensions.propTypes = {
    children: PropTypes.func.isRequired,
}

export default function Dimensions({ children, ...props }) {
    const node = useRef()
    const [dimensions, setDimensions] = useState({
        width: null,
        height: null,
    })
    function updateDimensions() {
        setDimensions({
            width: node.current.offsetWidth,
            height: node.current.offsetHeight,
        })
    }
    const listener = useCallback(throttle(updateDimensions, 250), [])

    useEventListener('resize', listener)
    useEventListener('orientationchange', listener)
    useLayoutEffect(updateDimensions, [])

    return (
        <div {...props} ref={node}>
            {children(dimensions)}
        </div>
    )
}
