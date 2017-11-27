import React from 'react'
import PropTypes from 'prop-types'
import styles from './Forecast.css'
import { InnerHTML } from 'components/misc'

Headline.propTypes = {
    children: PropTypes.string.isRequired,
}

export default function Headline({ children }) {
    return (
        <header className={styles.Headline}>
            <InnerHTML>{children}</InnerHTML>
        </header>
    )
}
