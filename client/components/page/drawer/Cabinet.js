import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Backdrop from './Backdrop'
import SIDE, { LEFT, RIGHT } from './constants/sides'
import classnames from 'classnames/bind'
import styles from './Drawer.css'

Cabinet.propTypes = {
    children: PropTypes.node.isRequired,
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
    backdrop = false,
    onCloseClick,
    children,
}) {
    const withBackdrop = open && backdrop
    const style = {
        width,
        [side.toLowerCase()]: open ? 0 : -width,
    }
    const className = classNames({
        Left: side === LEFT,
        Right: side === RIGHT,
        Open: open,
    })

    return (
        <Fragment>
            {withBackdrop && <Backdrop onClick={onCloseClick} />}
            <section style={style} className={className}>
                {children}
            </section>
        </Fragment>
    )
}

const classNames = classnames.bind(styles)
