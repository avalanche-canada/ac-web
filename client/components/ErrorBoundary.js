import { Component } from 'react'
import PropTypes from 'prop-types'

export default class ErrorBoundary extends Component {
    static propTypes = {
        children: PropTypes.element.isRequired,
        fallback: PropTypes.oneOfType([PropTypes.func, PropTypes.element])
            .isRequired,
        onError: PropTypes.func,
    }
    static defaultProps = {
        onError() {},
    }
    state = {}
    componentDidCatch(error, extra) {
        const { onError } = this.props

        this.setState({ error, extra }, () => {
            onError(error, extra)
        })
    }
    render() {
        const { children, fallback } = this.props

        return this.state.error
            ? typeof fallback === 'function'
                ? fallback(this.state)
                : fallback
            : children
    }
}
