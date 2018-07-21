import { createElement, PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Loading, Error, Muted } from 'components/text'
import { trulyKeys } from 'utils/object'

const COMPONENTS = new Map([
    ['isLoading', Loading],
    ['isError', Error],
    ['isLoaded', Muted],
])
const MESSAGES = new Map([
    ['isLoading', 'Loading...'],
    ['isError', 'An error happened...'],
])

export default class Status extends PureComponent {
    static propTypes = {
        children: PropTypes.node,
        isLoading: PropTypes.bool,
        isLoaded: PropTypes.bool,
        isError: PropTypes.bool,
        messages: PropTypes.shape({
            isLoading: PropTypes.string,
            isError: PropTypes.string,
            isLoaded: PropTypes.string,
        }),
        style: PropTypes.object,
    }
    static defaultProps = {
        children: null,
    }
    render() {
        const {
            isLoading,
            isError,
            isLoaded,
            messages = {},
            style,
        } = this.props
        const [key] = trulyKeys({ isLoading, isError, isLoaded })

        if (!key || !COMPONENTS.has(key)) {
            return this.props.children
        }

        const message = key in messages ? messages[key] : MESSAGES.get(key)

        return message
            ? createElement(COMPONENTS.get(key), { style }, message)
            : this.props.children
    }
}
