import { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { renderChildren } from './utils'

export default class SortedCollection extends PureComponent {
    static propTypes = {
        values: PropTypes.array,
        sorter: PropTypes.func,
        reverse: PropTypes.bool,
        children: PropTypes.oneOfType([PropTypes.func, PropTypes.element])
            .isRequired,
    }
    render() {
        const { children, values, sorter, reverse } = this.props

        if (typeof sorter !== 'function') {
            return renderChildren(children, values)
        }

        const sorted = values.sort(sorter)

        return renderChildren(children, reverse ? sorted.reverse() : sorted)
    }
}
