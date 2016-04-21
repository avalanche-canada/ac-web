import React, { Component, PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import styles from './Tag.css'

function K() {}

class Tag extends Component {
    static propTypes = {
        children: PropTypes.string.isRequired,
        onToggle: PropTypes.func,
        isActive: PropTypes.bool,
    }
    static defaultProps = {
        onToggle: K,
        isActive: false,
    }
    constructor(props, ...args) {
        super(props, ...args)

        this.state = {
            isActive: props.isActive
        }

        this.handleClick = this.handleClick.bind(this)
    }
    set isActive(isActive) {
        this.setState({ isActive}, () => {
            this.props.onToggle(isActive)
        })
    }
    componentWillReceiveProps({ isActive }) {
        if (isActive === this.state.isActive) {
            return
        }

        this.isActive = isActive
    }
    handleClick(event) {
        event.preventDefault()

        this.isActive = !this.state.isActive
    }
    render() {
        return (
            <li styleName={this.state.isActive ? 'Item--active' : 'Item'}>
                <a href='#' onClick={this.handleClick}>
                    {this.props.children}
                </a>
            </li>
        )
    }
}

export default CSSModules(Tag, styles)
