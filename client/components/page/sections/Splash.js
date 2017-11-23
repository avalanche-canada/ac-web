import React from 'react'
import PropTypes from 'prop-types'
import { Br } from 'components/markup'
import styles from './Sections.css'

Splash.propTypes = {
    title: PropTypes.string,
    children: PropTypes.node.isRequired,
}

export default function Splash({ title, children }) {
    return (
        <section className={styles.Splash}>
            <header className={styles['Splash--Header']}>
                {title && <h1>{title}</h1>}
                <Br ribbon />
            </header>
            <div className={styles['Splash--Content']}>{children}</div>
        </section>
    )
}
