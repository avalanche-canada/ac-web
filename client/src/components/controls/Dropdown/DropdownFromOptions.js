import React, {PropTypes} from 'react'
import Dropdown from './Dropdown'
import DropdownOption from './DropdownOption'

DropdownFromOptions.propTypes = {
    options: PropTypes.instanceOf(Map).isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.instanceOf(Set)]),
    placeholder: PropTypes.string,
    multiple: PropTypes.bool,
}

export default function DropdownFromOptions({options = new Map(), ...props}) {
    return (
        <Dropdown {...props}>
            {[...options].map(([value, text]) => (
                <DropdownOption key={value} value={value}>
                    {text}
                </DropdownOption>
            ))}
        </Dropdown>
    )
}
