import React from 'react'
import {TimePicker} from 'components/misc'
import picker from './picker'

export default picker.clone({
    renderPicker({value, onChange, close}) {
        function handleChange(value) {
            onChange(value)
            close()
        }

        return (
            <TimePicker value={value} onChange={handleChange} autoFocus />
        )
    }
})
