import React, {PropTypes} from 'react'
import CSSModules from 'react-css-modules'
import styles from './Drawer.css'
import SIDE, {LEFT, RIGHT} from './constants/sides'
import {Close} from 'components/button'

function getDrawerStyle(position, width) {
    return {
        transform: `translateX(${position * 100}%)`,
        width,
    }
}

const STYLE_NAMES = new Map([
    [LEFT, 'Drawer--Left'],
    [RIGHT, 'Drawer--Right'],
])

Drawer.propTypes = {
    side: PropTypes.oneOf([LEFT, RIGHT]).isRequired,
    open: PropTypes.bool.isRequired,
    position: PropTypes.number.isRequired,
    width: PropTypes.number,
    header: PropTypes.node,
    onCloseClick: PropTypes.func,
    children: PropTypes.node.isRequired,
}

function Drawer(props) {
    const {side = SIDE, open, position, width, onCloseClick, children} = props
    let styleName = STYLE_NAMES.get(side)

    if (open) {
        styleName += ' Open'
    }

    return (
        <div style={getDrawerStyle(position, width)} styleName={styleName}>
            {onCloseClick && <Close onClick={onCloseClick} styleName='Close' />}
            {children}
        </div>
    )
}

export default CSSModules(Drawer, styles, {allowMultiple: true})
