import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'
import styles from './Credit.css'

export default class Credit extends PureComponent {
    static propTypes = {
        children: PropTypes.string.isRequired,
        compact: PropTypes.bool,
    }
    state = {
        expanded: false,
    }
    constructor(props) {
        super(props)

        this.classnames = classnames.bind(styles)
    }
    toggle = () => this.setState(toggle)
    get className() {
        return this.classnames({
            Credit: true,
            Compact: this.props.compact,
            Expanded: this.state.expanded,
        })
    }
    render() {
        return (
            <span
                data-label="Credit"
                className={this.className}
                onClick={this.toggle}>
                {this.props.children}
            </span>
        )
    }
}

function toggle({ expanded }) {
    return {
        expanded: !expanded,
    }
}
