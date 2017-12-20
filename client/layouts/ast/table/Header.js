import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Row, Header as Base, HeaderCell } from 'components/table'

export default class Header extends Component {
    static propTypes = {
        columns: PropTypes.array.isRequired,
        sorting: PropTypes.array,
        place: PropTypes.object,
        onSortingChange: PropTypes.func.isRequired,
    }
    getSorting(name, order) {
        const { sorting } = this.props

        if (Array.isArray(sorting) && sorting[0] === name) {
            return sorting[1]
        }

        return order
    }
    renderHeader = ({ title, name, property, sorting, ...header }) => {
        const onSortingChange = this.props.onSortingChange.bind(null, name)

        return (
            <HeaderCell
                key={name}
                onSortingChange={onSortingChange}
                sorting={this.getSorting(name, sorting)}
                {...header}>
                {typeof title === 'function' ? title(this.props) : title}
            </HeaderCell>
        )
    }
    render() {
        return (
            <Base>
                <Row>{this.props.columns.map(this.renderHeader)}</Row>
            </Base>
        )
    }
}
