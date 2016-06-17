import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import styles from './Table.css'
import SortingButton from '../misc/SortingButton'

export { ASC, DESC, NONE, NUMBER, STRING, DATE } from '../misc/SortingButton'

function K() {}

HeaderCell.propTypes = {
    children: PropTypes.arrayOf(PropTypes.node).isRequired,
    sorting: SortingButton.propTypes.sorting,
    type: SortingButton.propTypes.type,
    onSortingChange: PropTypes.func,
}

function HeaderCell({ children, sorting, onSortingChange = K }) {
    const sortable = sorting !== undefined

    return (
        <td styleName={sortable ? 'HeaderCell--Sortable' : 'HeaderCell'}>
            {children}
            {sortable && <SortingButton sorting={sorting} onChange={onSortingChange} />}
        </td>
    )
}

export default CSSModules(HeaderCell, styles)
