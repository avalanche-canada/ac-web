import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import ForecastContainer from 'containers/Forecast'
import { Status } from 'components/misc'
import Shim from 'components/Shim'
import { Forecast, Metadata, Headline, TabSet } from 'layouts/products/forecast'
import { NorthRockiesBlogFeed } from 'layouts/feed'
import { Disclaimer, DangerRatings } from 'layouts/products/forecast/Footer'
import styles from './TripPlanner.css'

export default class Content extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
    }
    renderOtherForecast(forecast) {
        const id = forecast.get('id')

        if (id === 'north-rockies') {
            return <NorthRockiesBlogFeed />
        }

        if (forecast.has('externalUrl')) {
            const externalUrl = forecast.get('externalUrl')

            return (
                <p className={styles.PanelContent}>
                    Avalanche forecast are available at:{' '}
                    <Link to={externalUrl} target={id}>
                        {externalUrl}
                    </Link>
                </p>
            )
        }

        return null
    }
    children = ({ status, forecast }) => (
        <Fragment>
            <Status {...status} />
            {forecast && !forecast.has('externalUrl') ? (
                <Forecast value={forecast.toJSON()}>
                    <Shim horizontal>
                        <Metadata />
                        <Headline />
                    </Shim>
                    <TabSet />
                </Forecast>
            ) : (
                forecast && (
                    <Shim horizontal>{this.renderOtherForecast(forecast)}</Shim>
                )
            )}
            <Disclaimer />
            <DangerRatings />
        </Fragment>
    )
    render() {
        return (
            <ForecastContainer name={this.props.id}>
                {this.children}
            </ForecastContainer>
        )
    }
}
