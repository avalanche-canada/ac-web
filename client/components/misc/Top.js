import React from 'react'
import PropTypes from 'prop-types'
import styles from './Top.css'

Top.propTypes = {
    title: PropTypes.string,
    children: PropTypes.node,
}

export default function Top({
    title = 'Go to top of document',
    children = 'Top',
}) {
    return (
        <a className={styles.Fixed} href="#top" title={title}>
            {children}
        </a>
    )
}
