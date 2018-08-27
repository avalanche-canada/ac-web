import React, { Component, createContext } from 'react'
import PropTypes from 'prop-types'
import { status } from 'services/fetch/utils'
// import Cache from './Cache'

// TODO: Implement a caching mechanism

const { Provider, Consumer } = createContext()
const STATE = {
    loading: false,
    data: undefined,
}

export default class Fetch extends Component {
    static propTypes = {
        children: PropTypes.oneOfType([PropTypes.func, PropTypes.element])
            .isRequired,
        request: PropTypes.instanceOf(Request).isRequired,
        // cache: PropTypes.bool,
    }
    static Consumer = Consumer
    static Loading = class Loading extends Component {
        static propTypes = {
            children: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
                .isRequired,
        }
        children = ({ loading }) => {
            const { children } = this.props

            return typeof children === 'function'
                ? children(loading)
                : loading
                    ? children
                    : null
        }
        render() {
            return <Consumer>{props => this.children(props)}</Consumer>
        }
    }
    static Data = class Data extends Component {
        static propTypes = {
            children: PropTypes.func.isRequired,
            strict: PropTypes.bool,
        }
        children = ({ data }) => {
            const { children, strict } = this.props

            return strict ? (data ? children(data) : null) : children(data)
        }
        render() {
            return <Consumer>{props => this.children(props)}</Consumer>
        }
    }
    state = STATE
    reset = () => {
        this.setState(STATE)
    }
    fulfill = data => {
        this.setState({ loading: false, data })
    }
    reject = error => {
        this.setState({ loading: false })

        throw error
    }
    fetch() {
        this.setState({ loading: true }, () => {
            fetch(this.props.request)
                .then(status)
                .then(this.fulfill, this.reject)
        })
    }
    componentDidUpdate({ request }) {
        if (request.url !== this.props.request.url) {
            this.fetch()
        }
    }
    componentDidMount() {
        this.fetch()
    }
    render() {
        const { children } = this.props
        const value = {
            ...this.state,
            reset: this.reset,
        }

        return (
            <Provider value={value}>
                {typeof children === 'function' ? children(value) : children}
            </Provider>
        )
    }
}
