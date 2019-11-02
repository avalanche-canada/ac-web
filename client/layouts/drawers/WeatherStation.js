import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from '@reach/router'
import { List, ListItem } from 'components/page'
import {
    Header,
    Container,
    Body,
    Navbar,
    Close,
    DisplayOnMap,
} from 'components/page/drawer'
import { Metadata, Station, Footer } from 'components/weather/station'
import { Loading, Warning } from 'components/text'
import Shim from 'components/Shim'
import * as Async from 'contexts/async'
import * as hooks from 'hooks/async/weather'
import Sponsor from 'layouts/Sponsor'
import * as utils from 'utils/station'
import { useLocation } from 'router/hooks'

WeatherStation.propTypes = {
    id: PropTypes.string.isRequired,
    onCloseClick: PropTypes.func.isRequired,
    onLocateClick: PropTypes.func.isRequired,
}

export default function WeatherStation({ id, onCloseClick, onLocateClick }) {
    return (
        <Async.Provider value={hooks.useStation(id)}>
            <Container>
                <Navbar>
                    <Sponsor label={null} />
                    <Close onClick={onCloseClick} />
                </Navbar>
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
                    <Async.Pending>
                        <Loading />
                    </Async.Pending>
                    <Async.Found>
                        {station => (
                            <Fragment>
                                <Shim horizontal>
                                    <Metadata {...station} />
                                </Shim>
                                <Measurements
                                    id={id}
                                    utcOffset={station.utcOffset}
                                />
                                <Shim horizontal>
                                    <Footer />
                                </Shim>
                            </Fragment>
                        )}
                    </Async.Found>
                    <Async.NotFound>
                        <StationList />
                    </Async.NotFound>
                </Body>
            </Container>
        </Async.Provider>
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
    const { location } = useLocation()
    const { pathname } = location

    return (
        <Async.Provider value={hooks.useStations()}>
            <h3>Click on a link below to see another weather station:</h3>
            <Async.Found>
                {stations => (
                    <List column={1}>
                        {stations.map(({ stationId, name }) => (
                            <ListItem
                                key={stationId}
                                to={`${pathname}?panel=weather-stations/${stationId}`}
                                replace>
                                {name}
                            </ListItem>
                        ))}
                    </List>
                )}
            </Async.Found>
        </Async.Provider>
    )
}
