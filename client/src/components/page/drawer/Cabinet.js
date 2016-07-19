import React, { PropTypes, createElement } from 'react'
import { Motion, spring, presets } from 'react-motion'
import Drawer from './Drawer'
import SIDE, {LEFT, RIGHT} from './constants/sides'

function K() {}

const preset = presets.noWobble

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
    onToggle: PropTypes.func,
}

export default function Cabinet({
    open = false,
    side = SIDE,
    width = 250,
    onToggle = K,
    header = null,
    children
}) {
    const motion = {
        defaultStyle,
        style: getMotionStyle(open, side),
    }

    return (
        <Motion {...motion} >
            {style => createElement(Drawer, {
                position: style.x,
                width,
                side,
                open,
                header,
                onToggle,
            }, children)}
        </Motion>
    )
}
