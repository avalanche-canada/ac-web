import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Base from 'components/pagination'

export default class Pagination extends PureComponent {
    static propTypes = {
        page: PropTypes.number.isRequired,
        pageSize: PropTypes.number,
        count: PropTypes.number.isRequired,
        onChange: PropTypes.func.isRequired,
    }
    static defaultProps = {
        pageSize: 25,
    }
    get total() {
        return Math.ceil(this.props.count / this.props.pageSize)
    }
    render() {
        const { page, onChange } = this.props

        return <Base total={this.total} active={page} onChange={onChange} />
    }
}
