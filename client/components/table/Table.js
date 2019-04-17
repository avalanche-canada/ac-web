import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'
import styles from './Table.css'

Table.propTypes = {
    children: PropTypes.node.isRequired,
    condensed: PropTypes.bool,
}

export default function Table({ condensed, children }) {
    const className = classNames({
        Table: true,
        Condensed: condensed,
    })

    return <table className={className}>{children}</table>
}

const classNames = classnames.bind(styles)
