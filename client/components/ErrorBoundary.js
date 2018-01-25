import { Component } from 'react'
import PropTypes from 'prop-types'
import { captureException } from 'services/raven'

export default class ErrorBoundary extends Component {
    static propTypes = {
        children: PropTypes.func.isRequired,
    }
    state = {
        hasError: false,
    }
    componentDidCatch(error, extra) {
        this.setState({ hasError: true, error, extra }, () => {
            // https://blog.sentry.io/2017/09/28/react-16-error-boundaries
            captureException(error, { extra })
        })
    }
    render() {
        return this.props.children(this.state)
    }
}
