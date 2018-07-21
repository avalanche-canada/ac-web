import React from 'react'
import PropTypes from 'prop-types'
import styles from './Drawer.css'
import Subject from './Subject'

Header.propTypes = {
    subject: PropTypes.string,
    children: PropTypes.node,
    showBorder: PropTypes.bool,
    style: PropTypes.object,
}

export default function Header({ subject, children, showBorder, style }) {
    const className = showBorder ? styles.HeaderWithBorder : styles.Header

    return (
        <header className={className} style={style}>
            {subject && <Subject>{subject}</Subject>}
            {children}
        </header>
    )
}
