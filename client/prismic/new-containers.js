import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Fetch from 'components/fetch'
import * as requests from './requests'
import * as params from 'prismic/params'
import parse from './parsers'
import {
    GENERIC,
    STATIC_PAGE,
    NEWS,
    EVENT,
    BLOG,
    SPECIAL_INFORMATION,
    FATAL_ACCIDENT,
    TOYOTA_TRUCK_REPORT,
    HOTZONE_REPORT,
    SPAW as SPAW_TYPE,
    WEATHER_FORECAST,
    HIGHLIGHT,
} from 'constants/prismic'

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
                document: data ? parse(data.results[0]) : undefined,
            })
        )
    render() {
        return <Search {...this.props}>{this.children}</Search>
    }
}

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

// Utils
function isMasterRef({ isMasterRef }) {
    return isMasterRef
}
