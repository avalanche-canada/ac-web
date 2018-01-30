import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import ForecastContainer from 'containers/Forecast'
import { Status } from 'components/misc'
import { Compound, Metadata, Headline, TabSet } from 'components/forecast'
import { NorthRockiesBlogFeed } from 'layouts/feed'
import { Disclaimer, DangerRatings } from 'components/forecast/Footer'
import Drawer, {
    Header,
    Container,
    Navbar,
    Body,
    DisplayOnMap,
    RIGHT,
} from 'components/page/drawer'
import styles from './TripPlanner.css'

export default class ForecastPanel extends Component {
    static propTypes = {
        region: PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
        }),
        onLocateClick: PropTypes.func.isRequired,
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
    renderChildren = ({ status, forecast, region }) => {
        const { onLocateClick } = this.props
        const canRender = Compound.canRender(forecast)

        return (
            <Fragment>
                <Header subject="Avalanche forecast">
                    <h1>
                        <span>{this.props.region.name}</span>
                        <DisplayOnMap onClick={onLocateClick} />
                    </h1>
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
            </Fragment>
        )
    }
    get container() {
        return (
            <Container>
                <Navbar />
                <ForecastContainer name={this.props.region.id}>
                    {this.renderChildren}
                </ForecastContainer>
            </Container>
        )
    }
    render() {
        const { region } = this.props

        return (
            <Drawer side={RIGHT} width={400} open={Boolean(region)}>
                {region ? this.container : null}
            </Drawer>
        )
    }
}
