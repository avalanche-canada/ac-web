import React from 'react'
import PropTypes from 'prop-types'
import { compose, onlyUpdateForKeys } from 'recompose'
import CSSModules from 'react-css-modules'
import styles from './Table.css'
import Sorting from '~/components/button/Sorting'
import noop from 'lodash/noop'
import { ASC, DESC, NONE } from '~/constants/sortings'

HeaderCell.propTypes = {
    children: PropTypes.node.isRequired,
    sorting: PropTypes.oneOf([ASC, DESC, NONE]),
    onSortingChange: PropTypes.func,
}

function HeaderCell({ children, sorting, onSortingChange = noop, ...props }) {
    const sortable = sorting !== undefined && sorting !== null
    const styleName = sortable ? 'HeaderCell--Sortable' : 'HeaderCell'

    return (
        <th styleName={styleName} {...props}>
            {children}
            {sortable &&
                <Sorting sorting={sorting} onChange={onSortingChange} />}
        </th>
    )
}

export default compose(
    onlyUpdateForKeys(['children', 'sorting']),
    CSSModules(styles)
)(HeaderCell)
