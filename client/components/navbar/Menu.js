import React from 'react'
import PropTypes from 'prop-types'
import styles from './Navbar.css'

Menu.propTypes = {
    isOpened: PropTypes.bool,
    children: PropTypes.node.isRequired,
}

export default function Menu({ isOpened, children }) {
    if (!isOpened) {
        return null
    }

    return <div className={styles.Menu}>{children}</div>
}
