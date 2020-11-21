import React, { Fragment } from 'react'
import { Link } from '@reach/router'
import { List, ListItem } from 'components/page'
import {
    Header,
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
import { FormattedMessage } from 'react-intl'
import { useFlyTo, useSecondaryDrawer } from 'layouts/main/drawers/hooks'
import { useName } from 'constants/products/names'
import { WEATHER_STATION } from 'constants/products'

export default function WeatherStation() {
    const { close, id } = useSecondaryDrawer()

    return (
        <Async.Provider value={hooks.useStation(id)}>
            <Navbar>
                <Sponsor label={null} />
                <Close onClick={close} />
            </Navbar>
            <Header subject={useName(WEATHER_STATION)}>
                <h1>
                    <Async.Pending>
                        <Loading as="span" />
                    </Async.Pending>
                    <Async.Found>
                        <Heading />
                    </Async.Found>
                    <Async.NotFound>
                        <Warning as="span">
                            <FormattedMessage
                                description="Layout drawers/WeatherStation"
                                defaultMessage="Weather station #{id} not found"
                                values={{
                                    id,
                                }}
                            />
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
        </Async.Provider>
    )
}

// Utils
function Measurements({ id, utcOffset }) {
    return (
        <Async.Provider value={hooks.useMeasurements(id)}>
            <Async.Pending>
                <Loading>
                    <FormattedMessage
                        description="Layout drawers/WeatherStation"
                        defaultMessage="Loading weather station measurements..."
                    />
                </Loading>
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
            <h3>
                <FormattedMessage
                    description="Layout drawers/WeatherStation"
                    defaultMessage="Click on a link below to see another weather station:"
                />
            </h3>
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

function Heading({ payload }) {
    const { id, name, longitude, latitude } = payload
    const flyTo = useFlyTo()
    function handleLocateClick() {
        flyTo([longitude, latitude])
    }

    return (
        <Fragment>
            <Link to={utils.path(id)}>{name}</Link>
            <DisplayOnMap onClick={handleLocateClick} />
        </Fragment>
    )
}
