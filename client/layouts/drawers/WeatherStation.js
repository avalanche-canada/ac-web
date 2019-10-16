import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link, Location } from '@reach/router'
import { NotFound } from 'utils/fetch'
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
import * as hooks from 'hooks/weather'
import Sponsor from 'layouts/Sponsor'
import DisplayOnMap from 'components/page/drawer/DisplayOnMap'
import * as utils from 'utils/station'

WeatherStation.propTypes = {
    id: PropTypes.string.isRequired,
    onCloseClick: PropTypes.func.isRequired,
    onLocateClick: PropTypes.func.isRequired,
}

export default function WeatherStation({ id, onCloseClick, onLocateClick }) {
    const [station, pending] = hooks.useStation(id)

    return (
        <ErrorBoundary fallback={<FallbackError />}>
            <Container>
                <Navbar>
                    <Sponsor label={null} />
                    <Close onClick={onCloseClick} />
                </Navbar>
                <Header subject="Weather station">
                    <h1>
                        {pending ? (
                            <Loading component="span" />
                        ) : station ? (
                            <Fragment>
                                <Link to={utils.path(id)}>{station.name}</Link>
                                <DisplayOnMap
                                    onClick={() => {
                                        onLocateClick(utils.geometry(station))
                                    }}
                                />
                            </Fragment>
                        ) : (
                            <Warning component="span">
                                Weather station #{id} not found
                            </Warning>
                        )}
                    </h1>
                </Header>
                <Body>
                    <Content>
                        {pending ? (
                            <Loading />
                        ) : station ? (
                            <Fragment>
                                <Metadata {...station} />
                                <Measurements
                                    id={id}
                                    utcOffset={station.utcOffset}
                                />
                                <Footer />
                            </Fragment>
                        ) : (
                            <StationList />
                        )}
                    </Content>
                </Body>
            </Container>
        </ErrorBoundary>
    )
}

// Utils
function FallbackError({ error }) {
    if (error instanceof NotFound) {
        return <Error>Weather station not found.</Error>
    }

    return <Error>An error happened while loading weather station data.</Error>
}

function Measurements({ id, utcOffset }) {
    const [measurements, pending] = hooks.useMeasurements(id)

    return pending ? (
        <Muted>Loading weather station measurements...</Muted>
    ) : (
        <Station utcOffset={utcOffset} measurements={measurements} />
    )
}

function StationList() {
    const [stations = []] = hooks.useStations()

    return (
        <Fragment>
            <h3>Click on a link below to see another weather station:</h3>
            <Location>
                {({ location }) => (
                    <List column={1}>
                        {stations.map(({ stationId, name }) => (
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
        </Fragment>
    )
}
