import React, {PropTypes} from 'react'
import {compose, onlyUpdateForKeys} from 'recompose'
import CSSModules from 'react-css-modules'
import styles from './Table.css'
import Sorting, {SORTINGS} from 'components/button/Sorting'

const {ASC, DESC, NONE} = SORTINGS

export {ASC, DESC, NONE} from 'components/button/Sorting'

function K() {}

HeaderCell.propTypes = {
    children: PropTypes.node.isRequired,
    sorting: PropTypes.oneOf(SORTINGS),
    onSortingChange: PropTypes.func,
}

function HeaderCell({children, sorting = NONE, onSortingChange = K, ...props}) {
    const sortable = sorting !== undefined
    const styleName = sortable ? 'HeaderCell--Sortable' : 'HeaderCell'

    return (
        <td styleName={styleName} {...props} >
            {children}
            {sortable && <Sorting sorting={sorting} onChange={onSortingChange} />}
        </td>
    )
}

export default compose(
    onlyUpdateForKeys(['children', 'sorting']),
    CSSModules(styles),
)(HeaderCell)
