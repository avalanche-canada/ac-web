import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'
import { Toggle } from 'react-powerplug'
import styles from './Credit.css'

export default class Credit extends PureComponent {
    static propTypes = {
        children: PropTypes.string.isRequired,
        compact: PropTypes.bool,
    }
    constructor(props) {
        super(props)

        this.classnames = classnames.bind(styles)
    }
    renderer = ({ on, toggle }) => {
        const className = this.classnames({
            Credit: true,
            Compact: this.props.compact,
            Expanded: on,
        })

        return (
            <span data-label="Credit" className={className} onClick={toggle}>
                {this.props.children}
            </span>
        )
    }
    render() {
        return <Toggle>{this.renderer}</Toggle>
    }
}
