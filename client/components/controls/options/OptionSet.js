import { Component, Children, cloneElement } from 'react'
import PropTypes from 'prop-types'

export default class OptionSet extends Component {
    static propTypes = {
        children: PropTypes.node.isRequired,
        onChange: PropTypes.func,
        selected: PropTypes.instanceOf(Set),
    }
    static defaultProps = {
        selected: new Set(),
    }
    cloneOption = (option, index) => {
        const { selected, onChange } = this.props
        const { key = index, value } = option.props

        return cloneElement(option, {
            key,
            active: selected.has(value),
            onClick: onChange,
        })
    }
    render() {
        return Children.map(this.props.children, this.cloneOption)
    }
}
