import React, { Component, Children, cloneElement } from 'react'
import PropTypes from 'prop-types'
import styles from './OptionSet.css'

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

        return cloneElement(option, {
            key: index,
            active: selected.has(option.props.value),
            onClick: onChange,
        })
    }
    render() {
        return Children.map(this.props.children, this.cloneOption)
    }
}
