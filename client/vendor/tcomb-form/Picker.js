import { useState } from 'react'
import PropTypes from 'prop-types'

Picker.propTypes = {
    onChange: PropTypes.func.isRequired,
    template: PropTypes.func.isRequired,
}

export default function Picker(props) {
    const [isOpen, setIsOpen] = useState(false)

    return props.template({
        ...props,
        isOpen,
        open() {
            setIsOpen(true)
        },
        close() {
            setIsOpen(false)
        },
        toggle() {
            setIsOpen(!isOpen)
        },
        onReset() {
            setIsOpen(false)
            props.onChange(null)
        },
        onSelect(event, value) {
            setIsOpen(false)
            props.onChange(value)
        },
    })
}
