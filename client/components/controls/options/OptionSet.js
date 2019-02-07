import { Children, cloneElement } from 'react'
import PropTypes from 'prop-types'

OptionSet.propTypes = {
    children: PropTypes.node.isRequired,
    onChange: PropTypes.func,
    value: PropTypes.oneOfType([
        PropTypes.instanceOf(Set),
        PropTypes.string,
        PropTypes.number,
    ]),
}

export default function OptionSet({ children, value, onChange }) {
    return Children.map(children, (option, index) => {
        let active = false

        if (value instanceof Set) {
            active = value.has(option.props.value)
        } else {
            active = value === option.props.value
        }

        return cloneElement(option, {
            key: index,
            active,
            onClick(option) {
                if (value instanceof Set) {
                    const values = new Set(Array.from(value))

                    if (values.has(option)) {
                        values.delete(option)
                    } else {
                        values.add(option)
                    }

                    onChange(values)
                } else {
                    onChange(option)
                }
            },
        })
    })
}
