import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'
import styles from './Description.css'

export default class Definition extends PureComponent {
    static propTypes = {
        children: PropTypes.node.isRequired,
        style: PropTypes.object,
        className: PropTypes.string,
        block: PropTypes.bool,
    }
    classnames = classnames.bind(styles)
    get className() {
        const { className, block } = this.props

        return this.classnames(className, {
            Definition: true,
            Block: block,
        })
    }
    render() {
        const { style, children } = this.props

        return (
            <dd className={this.className} style={style}>
                {children}
            </dd>
        )
    }
}
