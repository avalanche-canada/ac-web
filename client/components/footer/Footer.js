import React from 'react'
import StaticComponent from 'components/StaticComponent'
import { Link } from '@reach/router'
import styles from './Footer.css'

export default class Footer extends StaticComponent {
    render() {
        const year = new Date().getFullYear()

        return (
            <footer className={styles.Container}>
                <div className={styles.Content}>
                    <nav className={styles.Nav}>
                        <Link className={styles.Link} to="/about#contact-us">
                            Contact
                        </Link>
                        <Link className={styles.Link} to="/privacy-policy">
                            Privacy Policy
                        </Link>
                        <Link className={styles.Link} to="/terms-of-use">
                            Terms of use
                        </Link>
                    </nav>
                    <span className={styles.Rights}>
                        ©{year} Avalanche Canada, All Rights Reserved
                    </span>
                </div>
            </footer>
        )
    }
}
