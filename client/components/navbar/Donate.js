import React from 'react'
import Link from './Link'
import styles from './Navbar.css'

function Donate(props) {
    return (
        <Link {...props} className={styles.Donate}>
            Donate
        </Link>
    )
}

export default React.memo(Donate)
