import React from 'react'
import PropTypes from 'prop-types'
import styles from './Drawer.css'
import Subject from './Subject'

Header.propTypes = {
    subject: PropTypes.string,
    children: PropTypes.node,
}

export default function Header({ subject, children }) {
    return (
        <header className={styles.Header}>
            {subject && <Subject>{subject}</Subject>}
            {children}
        </header>
    )
}
