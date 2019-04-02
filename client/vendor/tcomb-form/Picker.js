import PropTypes from 'prop-types'
import { useBoolean } from 'utils/react/hooks'

Picker.propTypes = {
    onChange: PropTypes.func.isRequired,
    template: PropTypes.func.isRequired,
}

export default function Picker(props) {
    const [isOpen, open, close, toggle, reset] = useBoolean(false)

    return props.template({
        ...props,
        isOpen,
        open,
        close,
        toggle,
        onReset() {
            reset()
            props.onChange(null)
        },
        onSelect(event, value) {
            close()
            props.onChange(value)
        },
    })
}
