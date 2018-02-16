import React from 'react'
import PropTypes from 'prop-types'
import styles from './Drawer.css'
import Subject from './Subject'

Header.propTypes = {
    subject: PropTypes.string,
    children: PropTypes.node,
    showBorder: PropTypes.bool,
}

export default function Header({ subject, children, showBorder }) {
    const className = showBorder ? styles.BordererHeader : styles.Header

    return (
        <header className={className}>
            {subject && <Subject>{subject}</Subject>}
            {children}
        </header>
    )
}
