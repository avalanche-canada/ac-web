import React, { Component, createContext, cloneElement, Children } from 'react'
import PropTypes from 'prop-types'
import { status, NotFound } from 'services/fetch/utils'
import Cache, { None } from './Cache'

// Some inspirations, but still think this implementation is easier
// https://github.com/CharlesMangwa/react-data-fetching
// https://github.com/techniq/react-fetch-component

// FIXME: Make sure component is still mounted when it is time to set state
// TODO: Give a try to state machine

export default class Fetch extends Component {
    static propTypes = {
        children: PropTypes.oneOfType([PropTypes.func, PropTypes.element])
            .isRequired,
        request: PropTypes.instanceOf(Request).isRequired,
        cache: PropTypes.instanceOf(Cache),
    }
    static defaultProps = {
        cache: new None(),
    }
    state = {
        pending: false,
        fulfilled: this.cache.has(this.url),
        data: this.cache.get(this.url),
        error: null,
    }
    get cache() {
        return this.props.cache
    }
    get url() {
        return this.props.request.url
    }
    safeSetState(...args) {
        if (this.mounted) {
            return this.setState(...args)
        }
    }
    fulfill = data => {
        this.safeSetState({
            pending: false,
            fulfilled: true,
            data,
            error: null,
        })

        this.cache.set(this.url, data)
        FETCHING.delete(this.url)
    }
    reject = error => {
        this.safeSetState({
            pending: false,
            fulfilled: true,
            data: undefined,
            error,
        })

        FETCHING.delete(this.url)

        throw error
    }
    fetch() {
        const { url, cache } = this

        if (cache.has(url)) {
            this.safeSetState({
                pending: false,
                fulfilled: true,
                data: cache.get(url),
            })
        } else {
            this.safeSetState({
                pending: true,
                fulfilled: false,
                data: undefined,
            })

            let fetching

            if (FETCHING.has(url)) {
                fetching = FETCHING.get(url)
            } else {
                fetching = fetch(this.props.request).then(status)

                FETCHING.set(url, fetching)
            }

            fetching.then(this.fulfill, this.reject)
        }
    }
    componentDidUpdate({ request }) {
        if (this.url !== request.url) {
            this.fetch()
        }
    }
    componentDidMount() {
        this.mounted = true
        this.fetch()
    }
    componentWillUnmount() {
        this.mounted = false
    }
    retry = () => {
        this.fetch()
    }
    get params() {
        return {
            ...this.state,
            retry: this.retry,
            // TODO: Remove loading and just send the state to avoid rerender
            loading: this.state.pending, // Backward compatibility
        }
    }
    render() {
        const { error } = this.state
        const { children } = this.props

        return error && !(error instanceof NotFound) ? (
            throw error
        ) : (
            <Provider value={this.params}>
                {typeof children === 'function'
                    ? children(this.params)
                    : children}
            </Provider>
        )
    }
}

export class Fulfilled extends Component {
    static propTypes = {
        children: PropTypes.oneOfType([
            PropTypes.element,
            PropTypes.arrayOf(PropTypes.element),
            PropTypes.func,
        ]).isRequired,
    }
    static Found({ children }) {
        return (
            <Fulfilled>
                {data => (data ? Fulfilled.children(children, data) : null)}
            </Fulfilled>
        )
    }
    static NotFound({ children }) {
        return (
            <Fulfilled>
                {data => (data ? null : Fulfilled.children(children))}
            </Fulfilled>
        )
    }
    static children(children, data) {
        return typeof children === 'function'
            ? children(data)
            : data
            ? Children.map(children, child => cloneElement(child, { data }))
            : children
    }
    children = ({ fulfilled, data }) => {
        if (!fulfilled) {
            return null
        }

        return Fulfilled.children(this.props.children, data)
    }
    render() {
        return <Consumer>{this.children}</Consumer>
    }
}

export class Pending extends Component {
    static propTypes = {
        children: PropTypes.element.isRequired,
    }
    children = ({ pending }) => (pending ? this.props.children : null)
    render() {
        return <Consumer>{this.children}</Consumer>
    }
}

const { Provider, Consumer } = createContext()
const FETCHING = new Map()
