import React, { Component } from 'react'
import Link from './Link'
import styles from './Navbar.css'

export default class Donate extends Component {
    shouldComponentUpdate() {
        return false
    }
    render() {
        return (
            <Link {...this.props} className={styles.Donate}>
                Donate
            </Link>
        )
    }
}
