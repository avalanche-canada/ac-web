import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import ForecastContainer from 'containers/Forecast'
import { Status } from 'components/misc'
import * as drawers from 'components/page/drawer'
import { Compound, Metadata, Headline, TabSet } from 'components/forecast'
import { NorthRockiesBlogFeed } from 'layouts/feed'
import { Disclaimer, DangerRatings } from 'components/forecast/Footer'
import styles from './TripPlanner.css'

export default class Content extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
    }
    renderOtherForecast(forecast) {
        if (!forecast) {
            return null
        }

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
    children = ({ status, forecast }) => {
        const canRender = Compound.canRender(forecast)

        return (
            <Fragment>
                <drawers.Content>
                    <Compound forecast={forecast}>
                        <Status {...status} />
                        {canRender && <Metadata />}
                        {canRender && <Headline />}
                        {canRender && <TabSet />}
                        {canRender || this.renderOtherForecast(forecast)}
                    </Compound>
                </drawers.Content>
                <Disclaimer />
                <DangerRatings />
            </Fragment>
        )
    }
    render() {
        return (
            <ForecastContainer name={this.props.id}>
                {this.children}
            </ForecastContainer>
        )
    }
}
