import React from 'react'
import PropTypes from 'prop-types'
import styles from './Table.css'
import Sorting from 'components/button/Sorting'
import noop from 'lodash/noop'
import { ASC, DESC, NONE } from 'constants/sortings'

HeaderCell.propTypes = {
    children: PropTypes.node.isRequired,
    sorting: PropTypes.oneOf([ASC, DESC, NONE]),
    onSortingChange: PropTypes.func,
}

export default function HeaderCell({
    children,
    sorting,
    onSortingChange = noop,
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
