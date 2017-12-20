import { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { renderChildren } from './utils'

export default class PaginatedCollection extends PureComponent {
    static propTypes = {
        values: PropTypes.array,
        page: PropTypes.number,
        pageSize: PropTypes.number,
        children: PropTypes.oneOfType([PropTypes.func, PropTypes.element])
            .isRequired,
    }
    static defaultProps = {
        page: 1,
        pageSize: 25,
    }
    render() {
        const { children, values, page, pageSize } = this.props
        const begin = (page - 1) * pageSize
        const end = begin + pageSize

        return renderChildren(children, values.slice(begin, end))
    }
}
