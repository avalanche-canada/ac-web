import React from 'react'
import styles from './Navbar.css'
import { Link } from '@reach/router'

export default function Brand({ children, ...props }) {
    return (
        <Link className={styles.Brand} {...props}>
            {children}
        </Link>
    )
}
