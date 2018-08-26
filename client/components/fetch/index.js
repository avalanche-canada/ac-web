import React, { PureComponent, createContext, isValidElement } from 'react'
import PropTypes from 'prop-types'
import { status } from 'services/fetch/utils'
// import Cache from './Cache'

// TODO: Implement a caching mechanism

const { Provider, Consumer } = createContext()
const STATE = {
    loading: false,
    data: null,
}

export default class Fetch extends PureComponent {
    static propTypes = {
        children: PropTypes.oneOfType([PropTypes.func, PropTypes.element])
            .isRequired,
        request: PropTypes.instanceOf(Request).isRequired,
        // cache: PropTypes.bool,
    }
    static Consumer = Consumer
    static Loading({ children }) {
        return <Consumer>{state => children(state.loading)}</Consumer>
    }
    static Data({ children }) {
        return <Consumer>{state => children(state.data)}</Consumer>
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
    fetch = () => {
        const { request } = this.props

        fetch(request)
            .then(status)
            .then(this.fulfill, this.reject)
    }
    componentDidMount() {
        this.setState({ loading: true }, this.fetch)
    }
    render() {
        const children = value
        const value = {
            ...this.state,
            reset: this.reset,
        }

        return (
            <Provider value={value}>
                {isValidElement(children) ? children : children(value)}
            </Provider>
        )
    }
}
