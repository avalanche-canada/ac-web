import React from 'react'
import StaticComponent from 'components/StaticComponent'
import Link from './Link'
import styles from './Navbar.css'

export default class Donate extends StaticComponent {
    render() {
        return (
            <Link {...this.props} className={styles.Donate}>
                Donate
            </Link>
        )
    }
}
