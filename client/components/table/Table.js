import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import styles from './Table.css'

Table.propTypes = {
    children: PropTypes.node.isRequired,
    condensed: PropTypes.bool,
}

export default function Table({ condensed, children }) {
    const className = classnames(styles.Table, condensed && styles.Condensed)

    return <table className={className}>{children}</table>
}
