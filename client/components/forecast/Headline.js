import React from 'react'
import PropTypes from 'prop-types'
import { InnerHTML } from 'components/misc'
import styles from './Forecast.css'

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
