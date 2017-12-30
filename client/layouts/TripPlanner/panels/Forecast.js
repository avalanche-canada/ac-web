import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import ForecastContainer from 'containers/Forecast'
import { Status } from 'components/misc'
import { Compound, Metadata, Headline, TabSet } from 'components/forecast'
import Panel from './Panel'
import * as utils from 'utils/region'
import { Locate } from 'components/button'
import { NorthRockiesBlogFeed } from 'layouts/feed'
import styles from '../TripPlanner.css'

export default class ForecastPanel extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        onLocateClick: PropTypes.func.isRequired,
    }
    renderHeader(forecast, region) {
        if (!forecast || !region) {
            return null
        }

        const { onLocateClick } = this.props
        function locate() {
            onLocateClick(utils.geometry(region))
        }

        return (
            <header>
                <h2>{forecast.get('bulletinTitle') || forecast.get('name')}</h2>
                <Locate onClick={locate} />
            </header>
        )
    }
    renderOtherForecast(forecast) {
        if (!forecast) {
            return null
        }

        if (forecast.get('id') === 'north-rockies') {
            return <NorthRockiesBlogFeed />
        }

        if (forecast.has('externalUrl')) {
            const externalUrl = forecast.get('externalUrl')

            return (
                <p className={styles.PanelContent}>
                    Avalanche forecast are available at:{' '}
                    <Link to={externalUrl} target={forecast.get('id')}>
                        {externalUrl}
                    </Link>
                </p>
            )
        }

        return null
    }
    children = ({ status, forecast, region }) => {
        const canRender = Compound.canRender(forecast)

        return (
            <Compound forecast={forecast}>
                {forecast && region
                    ? this.renderHeader(forecast, region)
                    : null}
                <Status {...status} />
                {canRender && <Metadata />}
                {canRender && <Headline />}
                {canRender && <TabSet />}
                {canRender || this.renderOtherForecast(forecast)}
            </Compound>
        )
    }
    render() {
        return (
            <Panel header="Avalanche forecast">
                <ForecastContainer name={this.props.name}>
                    {this.children}
                </ForecastContainer>
            </Panel>
        )
    }
}
