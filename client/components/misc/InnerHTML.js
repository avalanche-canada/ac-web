import { createElement, Component } from 'react'
import PropTypes from 'prop-types'

export default class InnerHTML extends Component {
    static propTypes = {
        children: PropTypes.string,
        component: PropTypes.string,
    }
    static defaultProps = {
        component: 'div',
    }
    shouldComponentUpdate({ children }) {
        return children !== this.props.children
    }
    render() {
        const { children, component, ...props } = this.props

        if (children) {
            props.dangerouslySetInnerHTML = {
                __html: children,
            }

            return createElement(component, props)
        }

        return null
    }
}
