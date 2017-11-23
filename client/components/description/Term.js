import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'
import styles from './Description.css'

export default class Term extends PureComponent {
    static propTypes = {
        children: PropTypes.node.isRequired,
        style: PropTypes.object,
        className: PropTypes.string,
        block: PropTypes.bool,
        oneLiner: PropTypes.bool,
    }
    constructor(props) {
        super(props)

        this.classnames = classnames.bind(styles)
    }
    get className() {
        return this.classnames(this.props.className, {
            Term: true,
            Block: this.props.block,
            OneLiner: this.props.oneLiner,
        })
    }
    render() {
        return (
            <dt className={this.className} style={this.props.style}>
                {this.props.children}
            </dt>
        )
    }
}
