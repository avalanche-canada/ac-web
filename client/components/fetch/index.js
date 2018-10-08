import React, { Component, createContext, cloneElement, Children } from 'react'
import PropTypes from 'prop-types'
import { status } from 'services/fetch/utils'
import Cache, { None } from './Cache'

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
    }
    get cache() {
        return this.props.cache
    }
    get url() {
        return this.props.request.url
    }
    fulfill = data => {
        this.setState({ pending: false, fulfilled: true, data }, () => {
            this.cache.set(this.url, data)
            FETCHING.delete(this.url)
        })
    }
    reject = error => {
        this.setState(
            { pending: false, fulfilled: true, data: undefined },
            () => {
                FETCHING.delete(this.url)
            }
        )

        throw error
    }
    fetch() {
        if (this.cache.has(this.url)) {
            this.setState({
                pending: false,
                fulfilled: true,
                data: this.cache.get(this.url),
            })
        } else {
            this.setState(
                { pending: true, fulfilled: false, data: undefined },
                () => {
                    const { url } = this
                    let fetching

                    if (FETCHING.has(url)) {
                        fetching = FETCHING.get(url)
                    } else {
                        fetching = fetch(this.props.request).then(status)

                        FETCHING.set(url, fetching)
                    }

                    fetching.then(this.fulfill, this.reject)
                }
            )
        }
    }
    componentDidUpdate({ request }) {
        if (this.url !== request.url) {
            this.fetch()
        }
    }
    componentDidMount() {
        this.fetch()
    }
    get params() {
        return {
            ...this.state,
            // TODO: Remove loading
            loading: this.state.pending, // Backward compatibility
        }
    }
    render() {
        const { children } = this.props

        return (
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
    children = ({ fulfilled, data }) => {
        if (!fulfilled) {
            return null
        }

        const { children } = this.props

        return typeof children === 'function'
            ? children(data)
            : Children.map(children, child => cloneElement(child, { data }))
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
