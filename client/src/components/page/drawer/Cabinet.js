import React, { PropTypes, createElement } from 'react'
import { Motion, spring, presets } from 'react-motion'
import Drawer from './Drawer'

function K() {}

const preset = presets.noWobble

export const LEFT = 'Left'
export const RIGHT = 'Right'

const defaultStyle = {
    x: 0
}

function getMotionStyle(open, side) {
    const value = Number(!open) * (side === LEFT ? -1 : 1)

    return {
        x: spring(value, preset)
    }
}

Cabinet.propTypes = {
    children: PropTypes.node.isRequired,
    header: PropTypes.node,
    side: PropTypes.oneOf([LEFT, RIGHT]),
    open: PropTypes.bool,
    width: PropTypes.number,
    closable: PropTypes.bool,
    onClose: PropTypes.func,
    onOpen: PropTypes.func,
}

export default function Cabinet({
    open = false,
    side = LEFT,
    closable = true,
    width = 250,
    onClose = K,
    onOpen = K,
    header = null,
    children
}) {
    const motion = {
        defaultStyle,
        style: getMotionStyle(open, side),
        onRest: open ? onOpen : onClose,
    }

    return (
        <Motion {...motion} >
            {style => createElement(Drawer, {
                position: style.x,
                width,
                side,
                open,
                header,
            }, children)}
        </Motion>
    )
}
