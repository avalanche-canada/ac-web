import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Fetch from 'components/fetch'
import ErrorBoundary from 'components/ErrorBoundary'
import { forecast } from 'api/requests/forecast'
import { metadata } from 'api/requests/metadata'
import * as transformers from 'api/transformers'
import { Error } from 'components/text'

export class Forecast extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        date: PropTypes.instanceOf(Date),
        children: PropTypes.func.isRequired,
    }
    children({ data, ...props }) {
        Object.assign(props, {
            data: data ? transformers.transformForecast(data) : data,
        })

        return this.props.children(props)
    }
    renderError() {
        return <Error>An error happened while retrieving forecast data.</Error>
    }
    render() {
        const { name, date } = this.props
        const request = forecast(name, date)

        return (
            <ErrorBoundary fallback={this.renderError}>
                <Fetch request={request}>{props => this.children(props)}</Fetch>
            </ErrorBoundary>
        )
    }
}

export class Region extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        children: PropTypes.func.isRequired,
    }
    renderError() {
        return (
            <Error>
                An error happened while retrieving forecast region data.
            </Error>
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
                <Fetch request={metadata()}>{this.children}</Fetch>
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
                ? Object.values(data['forecast-regions']).sort(regionSorter)
                : data,
        })

        return this.props.children(props)
    }
    render() {
        return (
            <ErrorBoundary fallback={this.renderError}>
                <Fetch request={metadata()}>{this.children}</Fetch>
            </ErrorBoundary>
        )
    }
}

// Utils
function regionSorter(a, b) {
    return a.name.localeCompare(b.name)
}
