import React from 'react'
import PropTypes from 'prop-types'
import styles from './Page.css'
import Sponsor from 'layouts/Sponsor'

Header.propTypes = {
    title: PropTypes.node.isRequired,
    children: PropTypes.node,
}

export default function Header({ title, children }) {
    return (
        <header className={styles.Header}>
            <h1>{title}</h1>
            <Sponsor />
            {children}
        </header>
    )
}
