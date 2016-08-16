import React, {PropTypes} from 'react'
import CSSModules from 'react-css-modules'
import styles from './Table.css'
import Sorting, {SORTINGS, TYPES} from 'components/button/Sorting'

const {ASC, DESC, NONE} = SORTINGS
const {NUMBER, STRING, DATE} = TYPES

export {ASC, DESC, NONE, NUMBER, STRING, DATE} from 'components/button/Sorting'

function K() {}

HeaderCell.propTypes = {
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
    sorting: PropTypes.oneOf(SORTINGS),
    type: PropTypes.oneOf(TYPES),
    onSortingChange: PropTypes.func,
}

function HeaderCell({children, sorting = NONE, onSortingChange = K, ...props}) {
    const sortable = sorting !== undefined

    return (
        <td styleName={sortable ? 'HeaderCell--Sortable' : 'HeaderCell'} {...props} >
            {children}
            {sortable && <Sorting sorting={sorting} onChange={onSortingChange} />}
        </td>
    )
}

export default CSSModules(HeaderCell, styles)
