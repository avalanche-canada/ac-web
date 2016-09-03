import React, {PropTypes} from 'react'
import Dropdown from './Dropdown'
import DropdownOption from './DropdownOption'

DropdownFromOptions.propTypes = {
    ...Dropdown.propTypes,
    options: PropTypes.instanceOf(Map).isRequired,
}

export default function DropdownFromOptions({options = new Map(), ...props}) {
    return (
        <Dropdown {...props}>
            {[...options].map(([value, text]) => (
                <DropdownOption value={value}>{text}</DropdownOption>
            ))}
        </Dropdown>
    )
}
