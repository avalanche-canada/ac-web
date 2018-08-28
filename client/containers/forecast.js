import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Fetch from 'components/fetch'
import ErrorBoundary from 'components/ErrorBoundary'
import { forecast } from 'api/requests/forecast'
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
