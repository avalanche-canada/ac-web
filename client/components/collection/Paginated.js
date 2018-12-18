import { memo } from 'react'
import PropTypes from 'prop-types'
import { renderChildren } from './utils'

PaginatedCollection.propTypes = {
    values: PropTypes.array,
    page: PropTypes.number,
    pageSize: PropTypes.number,
    children: PropTypes.oneOfType([PropTypes.func, PropTypes.element])
        .isRequired,
}

function PaginatedCollection({ children, values, page = 1, pageSize = 25 }) {
    const begin = (page - 1) * pageSize
    const end = begin + pageSize

    return renderChildren(children, values.slice(begin, end))
}

export default memo(PaginatedCollection)
