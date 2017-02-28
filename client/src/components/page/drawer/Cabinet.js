import React, {PropTypes, createElement} from 'react'
import {Motion, spring, presets } from 'react-motion'
import Backdrop from './Backdrop'
import Drawer from './Drawer'
import SIDE, {LEFT, RIGHT} from './constants/sides'

function getMotionStyle(open, side) {
    const value = Number(!open) * (side === LEFT ? -1 : 1)

    return {
        x: spring(value, presets.noWobble)
    }
}

Cabinet.propTypes = {
    children: PropTypes.node.isRequired,
    header: PropTypes.node,
    side: PropTypes.oneOf([LEFT, RIGHT]),
    open: PropTypes.bool,
    width: PropTypes.number,
    backdrop: PropTypes.bool,
    onCloseClick: PropTypes.func,
}

export default function Cabinet({
    open = false,
    side = SIDE,
    width = 250,
    header = null,
    backdrop = false,
    onCloseClick,
    children
}) {
    const withBackdrop = open && backdrop

    return (
        <div>
            {withBackdrop && <Backdrop onClick={onCloseClick} />}
            <Motion style={getMotionStyle(open, side)}>
                {style => createElement(Drawer, {
                    position: style.x,
                    width,
                    side,
                    open,
                    header,
                    onCloseClick,
                }, children)}
            </Motion>
        </div>
    )
}
