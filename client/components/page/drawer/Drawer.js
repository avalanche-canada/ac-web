import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'
import styles from './Drawer.css'
import SIDE, { LEFT, RIGHT } from './constants/sides'

Drawer.propTypes = {
    side: PropTypes.oneOf([LEFT, RIGHT]).isRequired,
    open: PropTypes.bool.isRequired,
    position: PropTypes.number.isRequired,
    width: PropTypes.number,
    children: PropTypes.node.isRequired,
}

export default function Drawer({
    side = SIDE,
    open,
    position,
    width,
    children,
}) {
    const transform = `translateX(${position * 100}%)`
    const style = {
        transform,
        WebkitTransform: transform,
        width,
    }
    const className = classNames({
        [STYLE_NAMES.get(side)]: true,
        Open: open,
    })

    return (
        <section style={style} className={className}>
            {children}
        </section>
    )
}

// Styles
const classNames = classnames.bind(styles)
const STYLE_NAMES = new Map([[LEFT, 'Drawer--Left'], [RIGHT, 'Drawer--Right']])
