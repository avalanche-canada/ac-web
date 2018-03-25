import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './Table.css'

export default class TBody extends Component {
    static propTypes = {
        children: PropTypes.node.isRequired,
        featured: PropTypes.bool,
        title: PropTypes.string,
    }
    get className() {
        const className = this.props.featured ? 'TBody--Featured' : 'TBody'

        return styles[className]
    }
    render() {
        const { title, children } = this.props

        return (
            <tbody data-title={title} className={this.className}>
                {children}
            </tbody>
        )
    }
}
