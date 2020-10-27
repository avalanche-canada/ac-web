import React from 'react'
import { FormattedDisplayName, FormattedMessage } from 'react-intl'
import { Link } from '@reach/router'
import { useLocale } from 'contexts/intl'
import { LOCALES } from 'constants/locale'
import Button, { ButtonSet } from 'components/button'
import styles from './Footer.css'

export default function Footer() {
    const { locale, set } = useLocale()
    const year = new Date().getFullYear()

    return (
        <footer className={styles.Container}>
            <div className={styles.Content}>
                <nav className={styles.Nav}>
                    <Link className={styles.Link} to="/about#contact-us">
                        <FormattedMessage
                            defaultMessage="Contact"
                            description="Footer"
                        />
                    </Link>
                    <Link className={styles.Link} to="/privacy-policy">
                        <FormattedMessage
                            defaultMessage="Privacy Policy"
                            description="Footer"
                        />
                    </Link>
                    <Link className={styles.Link} to="/terms-of-use">
                        <FormattedMessage
                            defaultMessage="Terms of use"
                            description="Footer"
                        />
                    </Link>
                </nav>
                <ButtonSet>
                    {Array.from(LOCALES).map(LOCALE => (
                        <Button
                            key={LOCALE}
                            disabled={LOCALE === locale}
                            onClick={() => set(LOCALE)}>
                            <FormattedDisplayName
                                type="language"
                                value={LOCALE.substr(0, 2)}
                            />
                        </Button>
                    ))}
                </ButtonSet>
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
