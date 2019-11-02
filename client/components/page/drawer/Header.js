import React from 'react'
import PropTypes from 'prop-types'
import Subject from './Subject'
import styles from './Drawer.css'

Header.propTypes = {
    subject: PropTypes.string,
    children: PropTypes.node,
    style: PropTypes.object,
}

export default function Header({ subject, children, ...props }) {
    return (
        <header {...props} className={styles.Header}>
            {subject && <Subject>{subject}</Subject>}
            {children}
        </header>
    )
}
