import React, { Fragment } from 'react'
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
import { Loading, Warning } from 'components/text'
import * as Async from 'contexts/async'
import * as hooks from 'hooks/async/weather'
import Sponsor from 'layouts/Sponsor'
import DisplayOnMap from 'components/page/drawer/DisplayOnMap'
import * as utils from 'utils/station'

WeatherStation.propTypes = {
    id: PropTypes.string.isRequired,
    onCloseClick: PropTypes.func.isRequired,
    onLocateClick: PropTypes.func.isRequired,
}

export default function WeatherStation({ id, onCloseClick, onLocateClick }) {
    return (
        <Container>
            <Navbar>
                <Sponsor label={null} />
                <Close onClick={onCloseClick} />
            </Navbar>
            <Async.Provider value={hooks.useStation(id)}>
                <Header subject="Weather station">
                    <h1>
                        <Async.Pending>
                            <Loading component="span" />
                        </Async.Pending>
                        <Async.Found>
                            {station => (
                                <Fragment>
                                    <Link to={utils.path(id)}>
                                        {station.name}
                                    </Link>
                                    <DisplayOnMap
                                        onClick={() => {
                                            onLocateClick(
                                                utils.geometry(station)
                                            )
                                        }}
                                    />
                                </Fragment>
                            )}
                        </Async.Found>
                        <Async.NotFound>
                            <Warning component="span">
                                Weather station #{id} not found
                            </Warning>
                        </Async.NotFound>
                    </h1>
                </Header>
                <Body>
                    <Content>
                        <Async.Pending>
                            <Loading />
                        </Async.Pending>
                        <Async.Found>
                            {station => (
                                <Fragment>
                                    <Metadata {...station} />
                                    <Measurements
                                        id={id}
                                        utcOffset={station.utcOffset}
                                    />
                                    <Footer />
                                </Fragment>
                            )}
                        </Async.Found>
                        <Async.NotFound>
                            <StationList />
                        </Async.NotFound>
                    </Content>
                </Body>
            </Async.Provider>
        </Container>
    )
}

// Utils
function Measurements({ id, utcOffset }) {
    return (
        <Async.Provider value={hooks.useMeasurements(id)}>
            <Async.Pending>
                <Loading>Loading weather station measurements...</Loading>
            </Async.Pending>
            <Async.Found>
                {measurements => (
                    <Station
                        utcOffset={utcOffset}
                        measurements={measurements}
                    />
                )}
            </Async.Found>
        </Async.Provider>
    )
}

function StationList() {
    return (
        <Async.Provider value={hooks.useStations()}>
            <h3>Click on a link below to see another weather station:</h3>
            <Async.Found>
                {stations => (
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
                )}
            </Async.Found>
        </Async.Provider>
    )
}
