import { memo } from 'react'
import PropTypes from 'prop-types'
import { renderChildren } from './utils'

FilteredCollection.propTypes = {
    values: PropTypes.array,
    predicates: PropTypes.array.isRequired,
    children: PropTypes.oneOfType([PropTypes.func, PropTypes.element])
        .isRequired,
}

function FilteredCollection({ children, values, predicates }) {
    return renderChildren(children, predicates.reduce(reducer, values))
}

export default memo(FilteredCollection)

// Utils
function reducer(collection, predicate) {
    return collection.filter(predicate)
}
