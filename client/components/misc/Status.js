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
        isLoading: PropTypes.bool,
        isLoaded: PropTypes.bool,
        isError: PropTypes.bool,
        messages: PropTypes.shape({
            isLoading: PropTypes.string,
            isError: PropTypes.string,
            isLoaded: PropTypes.string,
        }),
    }
    render() {
        const { isLoading, isError, isLoaded, messages = {} } = this.props
        const [key] = trulyKeys({ isLoading, isError, isLoaded })

        if (!key || !COMPONENTS.has(key)) {
            return null
        }

        const message = key in messages ? messages[key] : MESSAGES.get(key)

        return createElement(COMPONENTS.get(key), null, message)
    }
}
