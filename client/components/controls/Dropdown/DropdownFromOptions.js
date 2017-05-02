import React from 'react'
import PropTypes from 'prop-types'
import { pure } from 'recompose'
import Dropdown from './Dropdown'
import { Option } from '../options'

DropdownFromOptions.propTypes = {
    options: PropTypes.instanceOf(Map).isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.instanceOf(Set),
    ]),
    placeholder: PropTypes.string,
    multiple: PropTypes.bool,
}

function DropdownFromOptions({ options = new Map(), ...props }) {
    return (
        <Dropdown {...props}>
            {[...options].map(([value, text], index) => (
                <Option key={index} value={value}>
                    {text}
                </Option>
            ))}
        </Dropdown>
    )
}

export default pure(DropdownFromOptions)
