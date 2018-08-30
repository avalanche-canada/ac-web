import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Fetch from 'components/fetch'
import * as requests from './requests'
import { status } from 'services/fetch/utils'
import * as params from 'prismic/params'
import { FEED } from 'constants/prismic'
import parse from './parsers'

class MasterRef extends Component {
    children = ({ data }) =>
        data ? this.props.children(data.refs.find(isMasterRef).ref) : null
    render() {
        return <Fetch request={requests.api()}>{this.children}</Fetch>
    }
}

class Search extends Component {
    static propTypes = {
        children: PropTypes.func.isRequired,
        predicates: PropTypes.arrayOf(PropTypes.string).isRequired,
    }
    withMasterRef = ref => {
        const { children, predicates, ...options } = this.props
        const request = requests.search(ref, predicates, options)

        return <Fetch request={request}>{children}</Fetch>
    }
    render() {
        return <MasterRef>{this.withMasterRef}</MasterRef>
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

// TODO: Not sure if this class is needed! We could use .
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

                this.setState({ loading: false, tags })
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
