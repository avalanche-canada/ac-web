import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Fetch from 'components/fetch'
import ErrorBoundary from 'components/ErrorBoundary'
import { metadata } from 'api/requests/metadata'
import { Error } from 'components/text'

export class Region extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        children: PropTypes.func.isRequired,
    }
    renderError() {
        return (
            <Error>An error happened while retrieving forecast region.</Error>
        )
    }
    children = ({ data, ...props }) => {
        const { name } = this.props

        Object.assign(props, {
            data: data ? data['forecast-regions'][name] : data,
        })

        return this.props.children(props)
    }
    render() {
        return (
            <ErrorBoundary fallback={this.renderError}>
                <Metadata>{this.children}</Metadata>
            </ErrorBoundary>
        )
    }
}

export class Regions extends Component {
    static propTypes = {
        children: PropTypes.func.isRequired,
    }
    renderError() {
        return (
            <Error>An error happened while retrieving forecast regions.</Error>
        )
    }
    children = ({ data, ...props }) => {
        Object.assign(props, {
            data: data
                ? Object.values(data['forecast-regions']).sort(sorter)
                : data,
        })

        return this.props.children(props)
    }
    render() {
        return (
            <ErrorBoundary fallback={this.renderError}>
                <Metadata>{this.children}</Metadata>
            </ErrorBoundary>
        )
    }
}

export class HotZone extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        children: PropTypes.func.isRequired,
    }
    renderError() {
        return <Error>An error happened while retrieving hot zone.</Error>
    }
    children = ({ data, ...props }) => {
        const { name } = this.props

        Object.assign(props, {
            data: data ? data['hot-zones'][name] : data,
        })

        return this.props.children(props)
    }
    render() {
        return (
            <ErrorBoundary fallback={this.renderError}>
                <Metadata>{this.children}</Metadata>
            </ErrorBoundary>
        )
    }
}

export class HotZones extends Component {
    static propTypes = {
        children: PropTypes.func.isRequired,
        all: PropTypes.bool,
    }
    renderError() {
        return <Error>An error happened while retrieving hot zones.</Error>
    }
    children = ({ data, ...props }) => {
        const { all } = this.props
        Object.assign(props, {
            data: data
                ? Object.values(data['hot-zones'])
                      .filter(({ id }) => (all ? true : id === 'yukon'))
                      .sort(sorter)
                : data,
        })

        return this.props.children(props)
    }
    render() {
        return (
            <ErrorBoundary fallback={this.renderError}>
                <Metadata>{this.children}</Metadata>
            </ErrorBoundary>
        )
    }
}

// Utils
function Metadata({ children }) {
    return <Fetch request={metadata()}>{children}</Fetch>
}
function sorter(a, b) {
    return a.name.localeCompare(b.name)
}
