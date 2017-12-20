import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link as Base } from 'react-router-dom'
import { pathname, title } from 'utils/prismic'

export default class Link extends Component {
    static propTypes = {
        document: PropTypes.object.isRequired,
        children: PropTypes.node,
    }
    render() {
        const { children, document, ...props } = this.props
        const to = pathname(document)

        return (
            <Base {...props} to={to}>
                {children || title(document)}
            </Base>
        )
    }
}
