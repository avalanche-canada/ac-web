import React from 'react'
import PropTypes from 'prop-types'
import styles from './Forecast.module.css'

Summary.propTypes = {
    title: PropTypes.node,
    children: PropTypes.node,
}

export default function Summary({ title, children }) {
    if (!children) {
        return null
    }

    return (
        <section className={styles.Summary}>
            <h3>{title}</h3>
            {children}
        </section>
    )
}
