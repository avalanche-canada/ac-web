import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import styles from './Drawer.css'
import {LEFT, RIGHT} from './Cabinet'

function getDrawerStyle(position, width) {
    return {
        transform: `translateX(${position * 100}%)`,
        width,
    }
}

Drawer.propTypes = {
    side: PropTypes.oneOf([LEFT, RIGHT]),
    open: PropTypes.bool,
    position: PropTypes.number.isRequired,
    width: PropTypes.number,
    header: PropTypes.node,
    children: PropTypes.node.isRequired,
}

function Drawer({ side, open, header, position, width, children }) {
    return (
        <div style={getDrawerStyle(position, width)} styleName={`Drawer--${side}`}>
            {header}
            <div styleName='Content'>
                {children}
            </div>
        </div>
    )
}

export default CSSModules(Drawer, styles)
