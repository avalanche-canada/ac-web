import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import ForecastContainer from 'containers/Forecast'
import { Status } from 'components/misc'
import { Compound, Metadata, Headline, TabSet } from 'components/forecast'
import * as utils from 'utils/region'
import { NorthRockiesBlogFeed } from 'layouts/feed'
import styles from '../TripPlanner.css'
import { Disclaimer, DangerRatings } from 'components/forecast/Footer'
import {
    Close,
    Header,
    Container,
    Navbar,
    Body,
    DisplayOnMap,
} from 'components/page/drawer'

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
            <h1>
                {forecast.get('bulletinTitle') || forecast.get('name')}
                <DisplayOnMap onClick={locate} />
            </h1>
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
            <Container>
                <Navbar>
                    <Close />
                </Navbar>
                <Header subject="Avalanche forecast">
                    {forecast && region
                        ? this.renderHeader(forecast, region)
                        : null}
                </Header>
                <Body>
                    <Compound forecast={forecast}>
                        <Status {...status} />
                        {canRender && <Metadata />}
                        {canRender && <Headline />}
                        {canRender && <TabSet />}
                        {canRender || this.renderOtherForecast(forecast)}
                    </Compound>
                    <Disclaimer />
                    <DangerRatings />
                </Body>
            </Container>
        )
    }
    render() {
        return (
            <ForecastContainer name={this.props.name}>
                {this.children}
            </ForecastContainer>
        )
    }
}
