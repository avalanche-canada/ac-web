import React, { memo } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'
import styles from './Table.css'

Table.propTypes = {
    children: PropTypes.node.isRequired,
    hoverable: PropTypes.bool,
    condensed: PropTypes.bool,
}

function Table({ hoverable, condensed, children }) {
    const className = classNames({
        Table: !condensed,
        'Table--Condensed': condensed,
        Hoverable: hoverable,
    })

    return <table className={className}>{children}</table>
}

export default memo(Table)

const classNames = classnames.bind(styles)
