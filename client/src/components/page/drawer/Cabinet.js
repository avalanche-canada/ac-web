import React, { PropTypes, createElement} from 'react'
import {Motion, spring, presets } from 'react-motion'
import Backdrop from './Backdrop'
import Drawer from './Drawer'
import SIDE, {LEFT, RIGHT} from './constants/sides'

function K() {}

const preset = presets.noWobble

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
    backdrop: PropTypes.bool,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
}

export default function Cabinet({
    open = false,
    side = SIDE,
    width = 250,
    header = null,
    backdrop = false,
    onOpen,
    onClose,
    children
}) {
    const withBackdrop = open && backdrop

    return (
        <div>
            {withBackdrop && <Backdrop onClick={onClose} />}
            <Motion style={getMotionStyle(open, side)}>
                {style => createElement(Drawer, {
                    position: style.x,
                    width,
                    side,
                    open,
                    header,
                    onOpen,
                    onClose,
                }, children)}
            </Motion>
        </div>
    )
}
