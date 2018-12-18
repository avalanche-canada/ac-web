import { memo } from 'react'
import PropTypes from 'prop-types'
import { renderChildren } from './utils'

SortedCollection.propTypes = {
    values: PropTypes.array,
    sorter: PropTypes.func,
    reverse: PropTypes.bool,
    children: PropTypes.oneOfType([PropTypes.func, PropTypes.element])
        .isRequired,
}

function SortedCollection({ children, values, sorter, reverse }) {
    if (typeof sorter !== 'function') {
        return renderChildren(children, values)
    }

    const sorted = values.sort(sorter)

    return renderChildren(children, reverse ? sorted.reverse() : sorted)
}

export default memo(SortedCollection)
