import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { WithMap } from './context'

export const TOP_LEFT = 'top-left'
export const TOP_RIGHT = 'top-right'
export const BOTTOM_LEFT = 'bottom-left'
export const BOTTOM_RIGHT = 'bottom-right'

Control.propTypes = {
    controlClass: PropTypes.func.isRequired,
    position: PropTypes.oneOf([TOP_LEFT, TOP_RIGHT, BOTTOM_LEFT, BOTTOM_RIGHT]),
}

export default function Control(props) {
    return (
        <WithMap>
            <InnerControl {...props} />
        </WithMap>
    )
}

function InnerControl({
    position = BOTTOM_RIGHT,
    controlClass,
    map,
    ...props
}) {
    useEffect(() => {
        const control = new controlClass(props)

        map.addControl(control, position)
    }, [])

    return null
}
