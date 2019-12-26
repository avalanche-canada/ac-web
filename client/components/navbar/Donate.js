import React from 'react'
import Link from './Link'
import styles from './Navbar.css'

export default function Donate(props) {
    return (
        <Link {...props} className={styles.Donate}>
            Donate
        </Link>
    )
}
