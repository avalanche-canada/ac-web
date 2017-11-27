import React from 'react'
import PropTypes from 'prop-types'
import styles from './Page.css'

Article.propTypes = {
    title: PropTypes.string,
    children: PropTypes.node.isRequired,
}

export default function Article({ title, children }) {
    return (
        <article className={styles.Article}>
            {title && <h2>{title}</h2>}
            {children}
        </article>
    )
}
