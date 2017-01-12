import React, {PropTypes} from 'react'
import {compose, onlyUpdateForKeys} from 'recompose'
import CSSModules from 'react-css-modules'
import styles from './Table.css'
import Sorting, {SORTINGS} from 'components/button/Sorting'
import noop from 'lodash/noop'

const {ASC, DESC, NONE} = SORTINGS

export {ASC, DESC, NONE} from 'components/button/Sorting'

HeaderCell.propTypes = {
    children: PropTypes.node.isRequired,
    sorting: PropTypes.oneOf(SORTINGS),
    onSortingChange: PropTypes.func,
}

function HeaderCell({children, sorting = NONE, onSortingChange = noop, ...props}) {
    const sortable = sorting !== undefined && sorting !== null
    const styleName = sortable ? 'HeaderCell--Sortable' : 'HeaderCell'

    return (
        <th styleName={styleName} {...props} >
            {children}
            {sortable && <Sorting sorting={sorting} onChange={onSortingChange} />}
        </th>
    )
}

export default compose(
    onlyUpdateForKeys(['children', 'sorting']),
    CSSModules(styles),
)(HeaderCell)
