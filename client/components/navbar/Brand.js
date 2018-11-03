import React from 'react'
import styles from './Navbar.css'
import { Link } from '@reach/router'
import { memo } from 'utils/react'

function Brand({ children, ...props }) {
    return (
        <Link className={styles.Brand} {...props}>
            {children}
        </Link>
    )
}

export default memo.static(Brand)
