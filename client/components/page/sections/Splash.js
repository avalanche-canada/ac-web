import React from 'react'
import PropTypes from 'prop-types'
import { Br } from 'components/misc'
import styles from './Sections.css'

// TODO Move this component somewhere else

Splash.propTypes = {
    title: PropTypes.string,
    children: PropTypes.node.isRequired,
}

export default function Splash({ title, children }) {
    return (
        <section className={styles.Container}>
            <header>
                {title && <h1>{title}</h1>}
                <Br ribbon />
            </header>
            <div className={styles.Content}>{children}</div>
        </section>
    )
}
