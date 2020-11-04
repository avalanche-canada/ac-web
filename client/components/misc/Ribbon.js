import React from 'react'
import PropTypes from 'prop-types'
import styles from './Ribbon.css'
import { useIntl } from 'react-intl'

Ribbon.propTypes = {
    caption: PropTypes.string,
    children: PropTypes.string.isRequired,
}

export default function Ribbon({ children, caption }) {
    const intl = useIntl()

    caption =
        caption ||
        intl.formatMessage({
            description: 'Component misc/Ribbon',
            defaultMessage: 'From the reel',
        })

    return (
        <header className={styles.Container}>
            <div className={styles.Caption} title={caption}>
                {caption}
            </div>
            <div className={styles.Title} title={children}>
                {children}
            </div>
        </header>
    )
}
