import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link, Location } from '@reach/router'
import { List, ListItem } from 'components/page'
import {
    Header,
    Container,
    Body,
    Navbar,
    Content,
    Close,
} from 'components/page/drawer'
import { Metadata, Station, Footer } from 'components/weather/station'
import { Error, Muted, Loading, Warning } from 'components/text'
import ErrorBoundary from 'components/ErrorBoundary'
import { Fulfilled, Pending } from 'components/fetch'
import * as containers from 'containers/weather'
import Sponsor from 'layouts/Sponsor'
import DisplayOnMap from 'components/page/drawer/DisplayOnMap'
import * as utils from 'utils/station'

export default class WeatherStation extends PureComponent {
    static propTypes = {
        id: PropTypes.string.isRequired,
        onCloseClick: PropTypes.func.isRequired,
        onLocateClick: PropTypes.func.isRequired,
    }
    handleLocateClick = () => {
        this.props.onLocateClick(utils.geometry(this.station.data))
    }
    renderHeader(station) {
        this.station = station

        return (
            <h1>
                <Pending>
                    <Loading component="span" />
                </Pending>
                <Fulfilled.NotFound>
                    <Warning component="span">
                        Weather station #{this.props.id} not found
                    </Warning>
                </Fulfilled.NotFound>
                <Fulfilled.Found>
                    {({ stationId, name }) => (
                        <Fragment>
                            <Link to={`/weather/stations/${stationId}`}>
                                {name}
                            </Link>
                            <DisplayOnMap onClick={this.handleLocateClick} />
                        </Fragment>
                    )}
                </Fulfilled.Found>
            </h1>
        )
    }
    renderMeasurements({ utcOffset }, { data, loading }) {
        return loading || !data ? (
            <Muted>Loading westher station measurements...</Muted>
        ) : (
            <Station utcOffset={utcOffset} measurements={data} />
        )
    }
    children = props => (
        <Container>
            <Navbar>
                <Sponsor label={null} />
                <Close onClick={this.props.onCloseClick} />
            </Navbar>
            <Header subject="Weather station">
                {this.renderHeader(props)}
            </Header>
            <Body>
                <Content>
                    <Fulfilled.Found>
                        <Metadata {...props.data} />
                        <containers.Measurements id={this.props.id}>
                            {this.renderMeasurements.bind(this, props.data)}
                        </containers.Measurements>
                        <Footer />
                    </Fulfilled.Found>
                    <Fulfilled.NotFound>
                        <containers.Stations>
                            {renderStations}
                        </containers.Stations>
                    </Fulfilled.NotFound>
                    <Pending>
                        <Loading />
                    </Pending>
                </Content>
            </Body>
        </Container>
    )
    renderError() {
        return (
            <Error>An error happened while loading weather station data.</Error>
        )
    }
    render() {
        return (
            <ErrorBoundary fallback={this.renderError}>
                <containers.Station id={this.props.id}>
                    {this.children}
                </containers.Station>
            </ErrorBoundary>
        )
    }
}

function renderStations() {
    return (
        <Fulfilled>
            <h3>Click on a link below to see another weather station:</h3>
            <WeatherStations />
        </Fulfilled>
    )
}
function WeatherStations({ data }) {
    return (
        <Location>
            {({ location }) => (
                <List column={1}>
                    {data.map(({ stationId, name }) => (
                        <ListItem
                            key={stationId}
                            to={`${
                                location.pathname
                            }?panel=weather-stations/${stationId}`}
                            replace>
                            {name}
                        </ListItem>
                    ))}
                </List>
            )}
        </Location>
    )
}
