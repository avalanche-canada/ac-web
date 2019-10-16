import React from 'react'
import PropTypes from 'prop-types'
import { Sorting } from 'components/button'
import { ASC, DESC, NONE } from 'constants/sortings'
import styles from './Table.css'

HeaderCell.propTypes = {
    children: PropTypes.node.isRequired,
    // TODO Remove these props!!! Just passing children is enough! Needs to look at every usages.
    sorting: PropTypes.oneOf([ASC, DESC, NONE]),
    onSortingChange: PropTypes.func,
}

export default function HeaderCell({
    children,
    sorting,
    onSortingChange,
    ...props
}) {
    const sortable = sorting !== undefined && sorting !== null
    const className = sortable ? 'HeaderCell--Sortable' : 'HeaderCell'

    return (
        <th className={styles[className]} {...props}>
            {children}
            {sortable && (
                <Sorting sorting={sorting} onChange={onSortingChange} />
            )}
        </th>
    )
}
