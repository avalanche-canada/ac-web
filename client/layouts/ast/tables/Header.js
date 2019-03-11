import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Row, Header as Base, HeaderCell } from 'components/table'

Header.propTypes = {
    columns: PropTypes.array.isRequired,
    sorting: PropTypes.array,
    place: PropTypes.object,
    onSortingChange: PropTypes.func.isRequired,
}

export default function Header(props) {
    const { columns, sorting, onSortingChange } = props
    function getSorting(name, order) {
        if (Array.isArray(sorting) && sorting[0] === name) {
            return sorting[1]
        }

        return order
    }

    return (
        <Base>
            <Row>
                {columns.map(
                    ({ title, name, property, sorting, ...header }) => (
                        <HeaderCell
                            key={name}
                            onSortingChange={onSortingChange.bind(null, name)}
                            sorting={getSorting(name, sorting)}
                            {...header}>
                            {typeof title === 'function' ? title(props) : title}
                        </HeaderCell>
                    )
                )}
            </Row>
        </Base>
    )
}
