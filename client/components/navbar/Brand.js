import React, { memo } from 'react'
import styles from './Navbar.css'
import { Link } from '@reach/router'

function Brand({ children, ...props }) {
    console.warn('render Brand')
    return (
        <Link className={styles.Brand} {...props}>
            {children}
        </Link>
    )
}

export default memo(Brand, () => true)
