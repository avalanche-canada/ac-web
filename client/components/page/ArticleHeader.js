import React from 'react'
import PropTypes from 'prop-types'
import styles from './Page.css'

ArticleHeader.propTypes = {
    children: PropTypes.string.isRequired,
}

// TODO: header tag should not be used in that case

export default function ArticleHeader({ children }) {
    return (
        <header className={styles.ArticleHeader}>
            <h2>{children}</h2>
        </header>
    )
}
