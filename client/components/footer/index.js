import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Link } from '@reach/router'
import styles from './Footer.module.css'

export default function Footer() {
    const year = new Date().getFullYear()

    return (
        <footer className={styles.Container}>
            <div className={styles.Content}>
                <nav className={styles.Nav}>
                    <Link className={styles.Link} to="/about#contact-us">
                        <FormattedMessage defaultMessage="Contact" description="Footer" />
                    </Link>
                    <Link className={styles.Link} to="/privacy-policy">
                        <FormattedMessage defaultMessage="Privacy Policy" description="Footer" />
                    </Link>
                    <Link className={styles.Link} to="/terms-of-use">
                        <FormattedMessage defaultMessage="Terms of use" description="Footer" />
                    </Link>
                </nav>
                <span className={styles.Rights}>
                    <FormattedMessage
                        defaultMessage="©{year} Avalanche Canada, All Rights Reserved"
                        description="Footer"
                        values={{
                            year,
                        }}
                    />
                </span>
            </div>
        </footer>
    )
}
