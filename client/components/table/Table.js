import React from 'react'
import PropTypes from 'prop-types'
import css from './Table.css'

Table.propTypes = {
    children: PropTypes.node.isRequired,
}

export default function Table({ children }) {
    return <table className={css.Table}>{children}</table>
}
