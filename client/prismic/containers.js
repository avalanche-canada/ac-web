import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Fetch from 'components/fetch'
import { Memory as Cache } from 'components/fetch/Cache'
import ErrorBoundary from 'components/ErrorBoundary'
import Compose from 'components/Compose'
import * as Text from 'components/text'
import * as requests from './requests'
import * as params from 'prismic/params'
import { status } from 'services/fetch/utils'
import parse from './parsers'
import { FEED } from 'constants/prismic'
import { FR, EN } from 'constants/locale'

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
        locale: PropTypes.oneOf([FR, EN]),
    }
    withMasterRef = ref => {
        const { children, predicates, locale, ...options } = this.props

        if (locale === FR) {
            Object.assign(options, { lang: 'fr-ca' })
        }

        const request = requests.search(ref, predicates, options)

        return (
            <Fetch cache={Search.CACHE} request={request}>
                {children}
            </Fetch>
        )
    }
    renderError({ error }) {
        return (
            <Text.Error component="details">
                <summary>
                    An error happened while loading and display content.{' '}
                    <a href={document.location}>Retry</a>
                </summary>
                <p>
                    An error happened while retrieving data from prismic and
                    rendering its content.
                </p>
                <p>
                    {error.name}: {error.message}
                </p>
            </Text.Error>
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
        children: PropTypes.func,
    }
    static defaultProps = {
        children(props) {
            return props
        },
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
        const { children, ...props } = this.props

        return <Search {...props}>{this.children}</Search>
    }
}

// TODO: Not sure if this class is needed! We could use Document instead.
export class DocumentByUID extends Component {
    static propTypes = {
        children: PropTypes.func,
        type: PropTypes.string.isRequired,
        uid: PropTypes.string.isRequired,
    }
    render() {
        const { children, ...props } = this.props

        return <Document {...params.uid(props)}>{children}</Document>
    }
}

export class Documents extends Component {
    static propTypes = {
        children: PropTypes.func,
    }
    static defaultProps = {
        children(props) {
            return props
        },
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

export class Pages extends Component {
    static propTypes = {
        total: PropTypes.number.isRequired,
        children: PropTypes.func,
    }
    static defaultProps = {
        children(props) {
            return props
        },
    }
    constructor(props) {
        super(props)

        const { total, children, ...rest } = props
        const pages = Array.from(Array(total), (_, index) => index + 1)

        this.components = pages.map(page => (
            <Documents key={page} {...rest} page={page} />
        ))
    }
    render() {
        return (
            <Compose components={this.components}>
                {this.props.children}
            </Compose>
        )
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
