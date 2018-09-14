import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Fetch from 'components/fetch'
import { Memory as Cache } from 'components/fetch/Cache'
import ErrorBoundary from 'components/ErrorBoundary'
import { Error } from 'components/text'
import * as requests from './requests'
import * as params from 'prismic/params'
import { status } from 'services/fetch/utils'
import parse from './parsers'
import { FEED } from 'constants/prismic'

class MasterRef extends Component {
    static CACHE = new Cache(60 * 1000)
    children = ({ data }) =>
        data ? this.props.children(data.refs.find(isMasterRef).ref) : null
    render() {
        return (
            <Fetch cache={MasterRef.CACHE} request={requests.api()}>
                {this.children}
            </Fetch>
        )
    }
}

class Search extends Component {
    static CACHE = new Cache()
    static propTypes = {
        children: PropTypes.func.isRequired,
        predicates: PropTypes.arrayOf(PropTypes.string).isRequired,
    }
    withMasterRef = ref => {
        const { children, predicates, ...options } = this.props
        const request = requests.search(ref, predicates, options)

        return (
            <Fetch cache={Search.CACHE} request={request}>
                {children}
            </Fetch>
        )
    }
    renderError() {
        return (
            <Error>An error happened while retrieving data from prismic.</Error>
        )
    }
    render() {
        return (
            <ErrorBoundary fallback={this.renderError}>
                <MasterRef>{this.withMasterRef}</MasterRef>
            </ErrorBoundary>
        )
    }
}

export class Document extends Component {
    static propTypes = {
        children: PropTypes.func.isRequired,
    }
    children = ({ data, ...props }) =>
        this.props.children(
            Object.assign(props, {
                document:
                    data?.results?.length > 0
                        ? parse(data.results[0])
                        : undefined,
            })
        )
    render() {
        return <Search {...this.props}>{this.children}</Search>
    }
}

// TODO: Not sure if this class is needed! We could use Document instead.
export class DocumentByUID extends Component {
    static propTypes = {
        children: PropTypes.func.isRequired,
        type: PropTypes.string.isRequired,
        uid: PropTypes.string.isRequired,
    }
    render() {
        return (
            <Document {...params.uid(this.props)}>
                {this.props.children}
            </Document>
        )
    }
}

export class Documents extends Component {
    static propTypes = {
        children: PropTypes.func.isRequired,
    }
    children = ({ data, ...props }) => {
        if (data) {
            const { results, ...rest } = data

            Object.assign(props, rest, {
                documents: results.map(d => parse(d)),
            })
        }

        return this.props.children(props)
    }
    render() {
        return <Search {...this.props}>{this.children}</Search>
    }
}

export class Tags extends Component {
    static propTypes = {
        type: PropTypes.oneOf(FEED).isRequired,
        children: PropTypes.func.isRequired,
    }
    state = {
        loading: false,
        tags: new Set(),
    }
    async fetch() {
        this.setState({ loading: true }, async () => {
            try {
                const api = await fetch(requests.api()).then(status)
                const { ref } = api.refs.find(isMasterRef)
                const { type } = this.props
                const tags = new Set()
                let page = 1
                let nextPage = null

                do {
                    const { predicates, ...options } = params.tags({
                        type,
                        page,
                    })
                    const request = requests.search(ref, predicates, options)
                    const data = await fetch(request).then(status)

                    page = data.page + 1
                    nextPage = data.next_page

                    for (const result of data.results) {
                        for (const tag of result.tags) {
                            tags.add(tag)
                        }
                    }
                } while (nextPage)

                this.setState({
                    loading: false,
                    tags: new Set(Array.from(tags).sort(sorter)),
                })
            } catch (error) {
                this.setState({ loading: false })

                throw error
            }
        })
    }
    componentDidUpdate({ type }) {
        if (type !== this.props.type) {
            this.fetch()
        }
    }
    componentDidMount() {
        this.fetch()
    }
    render() {
        return this.props.children(this.state)
    }
}

// Utils
function isMasterRef({ isMasterRef }) {
    return isMasterRef
}
function sorter(a, b) {
    return a.localeCompare(b, 'en', { sensitivity: 'base' })
}
