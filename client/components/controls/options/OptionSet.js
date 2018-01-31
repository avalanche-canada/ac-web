import { Component, Children, cloneElement } from 'react'
import PropTypes from 'prop-types'

export default class OptionSet extends Component {
    static propTypes = {
        children: PropTypes.node.isRequired,
        onChange: PropTypes.func,
        value: PropTypes.oneOfType([
            PropTypes.instanceOf(Set),
            PropTypes.string,
            PropTypes.number,
        ]),
    }
    handleClick = option => {
        const { onChange, value } = this.props

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
    }
    cloneOption = (option, index) => {
        const { value } = this.props
        let active = false

        if (value instanceof Set) {
            active = value.has(option.props.value)
        } else {
            active = value === option.props.value
        }

        return cloneElement(option, {
            key: index,
            active,
            onClick: this.handleClick,
        })
    }
    render() {
        return Children.map(this.props.children, this.cloneOption)
    }
}
