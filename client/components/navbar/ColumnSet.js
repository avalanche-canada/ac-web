import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class ColumnSet extends Component {
    static propTypes = {
        count: PropTypes.number,
        gap: PropTypes.number,
        children: PropTypes.node,
    }
    shouldComponentUpdate({ children }) {
        return children !== this.props.children
    }
    get style() {
        const { count, gap } = this.props

        if (count === 1) {
            return null
        }

        return {
            columnCount: count,
            WebkitColumnCount: count,
            MozColumnCount: count,
            columnGap: gap,
            WebkitColumnGap: gap,
            MozColumnGap: gap,
        }
    }
    render() {
        return <div style={this.style}>{this.props.children}</div>
    }
}
