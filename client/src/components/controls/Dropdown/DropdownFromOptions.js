import React, {PropTypes} from 'react'
import Dropdown from './Dropdown'
import Option from './Option'

DropdownFromOptions.propTypes = {
    ...Dropdown.propTypes,
    options: PropTypes.instanceOf(Map).isRequired,
}

export default function DropdownFromOptions({options = new Map(), ...props}) {
    return (
        <Dropdown {...props}>
            {[...options].map(([value, text]) => (
                <Option value={value}>{text}</Option>
            ))}
        </Dropdown>
    )
}
