import React from 'react'
import { compose, withState, mapProps, setDisplayName, setPropTypes } from 'recompose'
import Dropdown from './Dropdown'

function propsMapper({setValue, onChange, ...rest}) {
    return {
        ...rest,
        onChange: value => {
            setValue(value)
            onChange(value)
        },
    }
}

export default compose(
    setDisplayName('ControlledDropdown'),
    setPropTypes(Dropdown.propTypes),
    withState('value', 'setValue', props => props.value),
    mapProps(propsMapper),
)(Dropdown)
