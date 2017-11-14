import React from 'react'
import PropTypes from 'prop-types'
import { OptionSet } from 'components/controls/options'

Select.propTypes = {
    children: PropTypes.node.isRequired,
    onOptionClick: PropTypes.func,
    selected: PropTypes.instanceOf(Set),
}

export default function Select({ children, onOptionClick, selected }) {
    return (
        <OptionSet show onOptionClick={onOptionClick} selected={selected}>
            {children}
        </OptionSet>
    )
}
