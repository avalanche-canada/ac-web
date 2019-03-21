import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Link, Location } from '@reach/router'
import { NotFound } from 'services/fetch/utils'
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

WeatherStation.propTypes = {
    id: PropTypes.string.isRequired,
    onCloseClick: PropTypes.func.isRequired,
    onLocateClick: PropTypes.func.isRequired,
}

function WeatherStation({ id, onCloseClick, onLocateClick }) {
    return (
        <ErrorBoundary fallback={renderError}>
            <containers.Station id={id}>
                {station => (
                    <Container>
                        <Navbar>
                            <Sponsor label={null} />
                            <Close onClick={onCloseClick} />
                        </Navbar>
                        <Header subject="Weather station">
                            <h1>
                                <Pending>
                                    <Loading component="span" />
                                </Pending>
                                <Fulfilled.NotFound>
                                    <Warning component="span">
                                        Weather station #{id} not found
                                    </Warning>
                                </Fulfilled.NotFound>
                                <Fulfilled.Found>
                                    <Link to={`/weather/stations/${id}`}>
                                        {station.data?.name}
                                    </Link>
                                    <DisplayOnMap
                                        onClick={() => {
                                            onLocateClick(
                                                utils.geometry(station.data)
                                            )
                                        }}
                                    />
                                </Fulfilled.Found>
                            </h1>
                        </Header>
                        <Body>
                            <Content>
                                <Fulfilled.Found>
                                    <Metadata {...station.data} />
                                    <containers.Measurements id={id}>
                                        {({ data, loading }) =>
                                            loading || !data ? (
                                                <Muted>
                                                    Loading weather station
                                                    measurements...
                                                </Muted>
                                            ) : (
                                                <Station
                                                    utcOffset={
                                                        station.data.utcOffset
                                                    }
                                                    measurements={data}
                                                />
                                            )
                                        }
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
                )}
            </containers.Station>
        </ErrorBoundary>
    )
}

export default memo(WeatherStation, (prev, next) => prev.id === next.id)

// Utils
function renderError({ error }) {
    if (error instanceof NotFound) {
        return <Error>Weather station not found.</Error>
    }

    return <Error>An error happened while loading weather station data.</Error>
}

function renderStations() {
    return (
        <Fulfilled.Found>
            <h3>Click on a link below to see another weather station:</h3>
            <WeatherStations />
        </Fulfilled.Found>
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
