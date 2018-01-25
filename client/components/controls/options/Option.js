import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './OptionSet.css'

export default class Option extends Component {
    static propTypes = {
        children: PropTypes.node.isRequired,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
            .isRequired,
        active: PropTypes.bool,
        onClick: PropTypes.func,
    }
    static defaultProps = {
        onClick() {},
    }
    handleMouseDown = () => {
        this.props.onClick(this.props.value)
    }
    get className() {
        const name = this.props.active ? 'Option--Active' : 'Option'

        return styles[name]
    }
    render() {
        const { children, value } = this.props
        const title = children || value

        return (
            <div
                title={title}
                className={this.className}
                onMouseDown={this.handleMouseDown}>
                {title}
            </div>
        )
    }
}
