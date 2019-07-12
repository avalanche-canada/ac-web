import React, { Component, createContext, cloneElement, Children } from 'react'
import PropTypes from 'prop-types'
import { status, NotFound } from 'services/fetch/utils'
import Cache, { None } from './Cache'

// Some inspirations, but still think this implementation is easier
// https://github.com/CharlesMangwa/react-data-fetching
// https://github.com/techniq/react-fetch-component

export default class Fetch extends Component {
    static propTypes = {
        children: PropTypes.oneOfType([PropTypes.func, PropTypes.element])
            .isRequired,
        url: PropTypes.string.isRequired,
        options: PropTypes.object,
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
        return this.props.url
    }
    get options() {
        return this.props.options
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
                fetching = fetch(this.url, this.options).then(status)

                FETCHING.set(url, fetching)
            }

            fetching.then(this.fulfill, this.reject)
        }
    }
    componentDidUpdate({ url }) {
        if (this.url !== url) {
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
    render() {
        const { error } = this.state
        const { children } = this.props

        return error && !(error instanceof NotFound) ? (
            throw error
        ) : (
            <Provider value={this.state}>
                {typeof children === 'function'
                    ? children(this.state)
                    : children}
            </Provider>
        )
    }
}

Fulfilled.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.func,
    ]).isRequired,
}

export function Fulfilled({ children }) {
    return (
        <Consumer>
            {({ fulfilled, data }) =>
                fulfilled ? Fulfilled.children(children, data) : null
            }
        </Consumer>
    )
}

Object.assign(Fulfilled, {
    Found({ children }) {
        return (
            <Fulfilled>
                {data => (data ? Fulfilled.children(children, data) : null)}
            </Fulfilled>
        )
    },
    NotFound({ children }) {
        return (
            <Fulfilled>
                {data => (data ? null : Fulfilled.children(children))}
            </Fulfilled>
        )
    },
    children(children, data) {
        return typeof children === 'function'
            ? children(data)
            : data
            ? Children.map(children, child => cloneElement(child, { data }))
            : children
    },
})

Pending.propTypes = {
    children: PropTypes.element.isRequired,
}

export function Pending({ children }) {
    return <Consumer>{({ pending }) => (pending ? children : null)}</Consumer>
}

const { Provider, Consumer } = createContext()
const FETCHING = new Map()
