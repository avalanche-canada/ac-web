import { Component, cloneElement } from 'react'
import PropTypes from 'prop-types'
import { isRedirect } from '@reach/router'
import { captureException } from 'services/sentry'

export default class ErrorBoundary extends Component {
    static propTypes = {
        children: PropTypes.element.isRequired,
        fallback: PropTypes.oneOfType([PropTypes.func, PropTypes.element])
            .isRequired,
        onError: PropTypes.func,
        capture: PropTypes.bool,
    }
    static defaultProps = {
        onError() {},
        capture: true,
    }
    static getDerivedStateFromError(error) {
        return { error }
    }
    state = {}
    componentDidCatch(error, extra) {
        if (isRedirect(error)) {
            throw error
        }

        const { onError, capture } = this.props

        if (capture) {
            // https://blog.sentry.io/2017/09/28/react-16-error-boundaries
            captureException(error, { extra })
        }

        this.setState({ error, extra }, () => {
            onError(error, extra)
        })
    }
    render() {
        const { children, fallback } = this.props

        return this.state.error
            ? typeof fallback === 'function'
                ? fallback(this.state)
                : cloneElement(fallback, this.state)
            : children
    }
}
