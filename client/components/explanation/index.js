import React from 'react'
import PropTypes from 'prop-types'
import styles from './Explanation.css'

Section.propTypes = {
    children: PropTypes.arrayOf(PropTypes.element).isRequired,
    style: PropTypes.object,
}

export function Section({ style, children }) {
    return (
        <section style={style} className={styles.Section}>
            {children}
        </section>
    )
}

Header.propTypes = {
    children: PropTypes.string.isRequired,
    style: PropTypes.object,
}

export function Header({ style, children }) {
    return (
        <h3 style={style} className={styles.Header}>
            {children}
        </h3>
    )
}

Content.propTypes = {
    children: PropTypes.node.isRequired,
    style: PropTypes.object,
}

export function Content({ style, children }) {
    return (
        <div style={style} className={styles.Content}>
            {children}
        </div>
    )
}
