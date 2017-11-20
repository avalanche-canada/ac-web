import { Component } from 'react'
import PropTypes from 'prop-types'
import { captureException } from 'services/raven'

export default class ErrorBoundary extends Component {
    static propTypes = {
        children: PropTypes.func.isRequired,
    }
    state = {
        hasError: false,
        error: null,
        info: null,
    }
    componentDidCatch(error, info) {
        this.setState({ hasError: true, error, info }, () => {
            captureException(error, info)
        })
    }
    render() {
        return this.props.children(this.state)
    }
}
