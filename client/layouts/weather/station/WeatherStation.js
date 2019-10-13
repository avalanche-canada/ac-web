import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import {
    List,
    ListItem,
    Page,
    Content,
    Header,
    Main,
    Headline,
} from 'components/page'
import { Metadata, Station, Footer } from 'components/weather/station'
import { Error, Muted, Loading } from 'components/text'
import ErrorBoundary from 'components/ErrorBoundary'
import * as hooks from 'hooks/weather'
import { path } from 'utils/station'

WeatherStation.propTypes = {
    id: PropTypes.string.isRequired,
}

export default function WeatherStation({ id }) {
    const [station, pending] = hooks.useStation(id)
    const error = (
        <Error>An error happened while loading weather station data.</Error>
    )

    return (
        <Page>
            <ErrorBoundary fallback={error}>
                <Header title={getTitle(station, pending)} />
                <Content>
                    <Main>
                        {pending ? (
                            <Loading>Loading weather station data...</Loading>
                        ) : station ? (
                            <StationLayout {...station} />
                        ) : (
                            <NoStation id={id} />
                        )}
                    </Main>
                </Content>
            </ErrorBoundary>
        </Page>
    )
}

function StationLayout(station) {
    const { utcOffset, stationId: id } = station
    const [measurements, pending] = hooks.useMeasurements(id)

    return (
        <Fragment>
            <Metadata {...station} id={id} />
            {pending ? (
                <Muted>Loading measurements...</Muted>
            ) : measurements ? (
                <Station utcOffset={utcOffset} measurements={measurements} />
            ) : null}
            <Footer />
        </Fragment>
    )
}
function NoStation({ id }) {
    const [stations = [], pending] = hooks.useStations()

    return (
        <Fragment>
            <Headline>
                Weather station #{id} does not exist. Click on a link below to
                see another weather station.
            </Headline>
            {pending && <Loading>Loading all weather stations...</Loading>}
            <List>
                {stations.map(({ stationId, name }) => (
                    <ListItem key={stationId} to={path(stationId)}>
                        {name}
                    </ListItem>
                ))}
            </List>
        </Fragment>
    )
}
function getTitle(station, pending) {
    return pending ? 'Loading...' : station?.name || 'No weather station'
}
