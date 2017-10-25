import React from 'react'
import PropTypes from 'prop-types'
import { DateElement } from 'components/time'
import styles from './Feature.css'

Feature.propTypes = {
    children: PropTypes.node.isRequired,
    name: PropTypes.string.isRequired,
    headline: PropTypes.string.isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
}

export default function Feature({ name, headline, date, children }) {
    return (
        <section className={styles.Container}>
            <header>
                <h2>{name}</h2>
                <DateElement value={date} />
                <div className={styles.Headline}>{headline}</div>
            </header>
            {children}
        </section>
    )
}
