import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import css from './Table.css'

Table.propTypes = {
    children: PropTypes.node.isRequired,
    // TODO Not sure this is still being used
    condensed: PropTypes.bool,
}

export default function Table({ condensed, children }) {
    const className = classnames(css.Table, {
        [css.Condensed]: condensed,
    })

    return <table className={className}>{children}</table>
}
