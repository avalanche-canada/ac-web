import React from 'react'
import PropTypes from 'prop-types'
import { Sorting } from 'components/button'
import { FlexContentCell } from 'components/table'

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
        <thead>
            <tr>
                {columns.map(
                    ({ title, name, property, sorting, ...header }) => (
                        <FlexContentCell key={name} {...header}>
                            {typeof title === 'function' ? title(props) : title}
                            <Sorting
                                onChange={onSortingChange.bind(null, name)}
                                sorting={getSorting(name, sorting)}
                            />
                        </FlexContentCell>
                    )
                )}
            </tr>
        </thead>
    )
}
