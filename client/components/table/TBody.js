import React from 'react'
import PropTypes from 'prop-types'
import styles from './Table.css'

TBody.propTypes = {
    children: PropTypes.node.isRequired,
    featured: PropTypes.bool,
    title: PropTypes.string,
}

export default function TBody({ title, featured, children }) {
    const className = featured ? 'TBody--Featured' : 'TBody'

    return (
        <tbody data-title={title} className={styles[className]}>
            {children}
        </tbody>
    )
}
