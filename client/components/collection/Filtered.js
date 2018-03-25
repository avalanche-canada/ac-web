import { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { renderChildren } from './utils'

function reducer(collection, predicate) {
    return collection.filter(predicate)
}

export default class FilteredCollection extends PureComponent {
    static propTypes = {
        values: PropTypes.array,
        predicates: PropTypes.array.isRequired,
        children: PropTypes.oneOfType([PropTypes.func, PropTypes.element])
            .isRequired,
    }
    render() {
        const { children, values, predicates } = this.props

        return renderChildren(children, predicates.reduce(reducer, values))
    }
}
