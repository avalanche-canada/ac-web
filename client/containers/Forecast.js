import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Fetch from 'components/fetch'
import { Memory } from 'components/fetch/Cache'
import ErrorBoundary from 'components/ErrorBoundary'
import Error from 'components/error'
import { forecast } from 'api/requests/forecast'
import * as transformers from 'api/transformers'
import { Blink } from 'components/text'
import { ButtonSet, Link } from 'components/button'

export class Forecast extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        date: PropTypes.instanceOf(Date),
        children: PropTypes.func.isRequired,
    }
    static CACHE = new Memory(15 * 60 * 1000)
    children({ data, ...props }) {
        Object.assign(props, {
            data: data ? transformers.transformForecast(data) : data,
        })

        return this.props.children(props)
    }
    renderError = ({ error }) => {
        const { message } = error

        if (message === 'Not Found') {
            return (
                <Error>
                    <p>
                        <Blink>
                            <strong>{this.props.name}</strong>
                        </Blink>{' '}
                        forecast region does not exist
                    </p>
                    <ButtonSet>
                        <Link to="/forecasts" chevron>
                            See all forecast regions
                        </Link>
                        <Link to="/map" chevron>
                            Go to the map
                        </Link>
                    </ButtonSet>
                </Error>
            )
        }

        return (
            <Error>
                <p>An error happened while retrieving forecast data.</p>
            </Error>
        )
    }
    render() {
        const { name, date } = this.props
        const request = forecast(name, date)

        return (
            <ErrorBoundary fallback={this.renderError}>
                <Fetch cache={Forecast.CACHE} request={request}>
                    {props => this.children(props)}
                </Fetch>
            </ErrorBoundary>
        )
    }
}
