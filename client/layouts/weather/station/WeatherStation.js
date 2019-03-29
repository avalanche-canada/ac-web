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
import { Fulfilled, Pending } from 'components/fetch'
import * as containers from 'containers/weather'

WeatherStation.propTypes = {
    id: PropTypes.string.isRequired,
}

export default function WeatherStation({ id }) {
    const error = (
        <Error>An error happened while loading weather station data.</Error>
    )

    return (
        <Page>
            <ErrorBoundary fallback={error}>
                <containers.Station id={id}>
                    {props => (
                        <Fragment>
                            <Header title={getTitle(props)} />
                            <Content>
                                <Main>
                                    <Pending>
                                        <Loading>
                                            Loading weather station data...
                                        </Loading>
                                    </Pending>
                                    <Fulfilled strict>
                                        {station =>
                                            station ? (
                                                <StationLayout data={station} />
                                            ) : (
                                                <NoStation id={id} />
                                            )
                                        }
                                    </Fulfilled>
                                </Main>
                            </Content>
                        </Fragment>
                    )}
                </containers.Station>
            </ErrorBoundary>
        </Page>
    )
}

function StationLayout({ data }) {
    return (
        <Fragment>
            <Metadata {...data} />
            <containers.Measurements id={data.stationId}>
                {renderMeasurements.bind(null, data)}
            </containers.Measurements>
            <Footer />
        </Fragment>
    )
}
function NoStation({ id }) {
    return (
        <Fragment>
            <Headline>
                Weather station #{id} does not exist. Click on a link below to
                see another weather station.
            </Headline>
            <containers.Stations>
                {() => (
                    <Fragment>
                        <Pending>
                            <Loading>Loading all weather stations...</Loading>
                        </Pending>
                        <Fulfilled>
                            {data => (
                                <List>
                                    {data.map(({ stationId, name }) => {
                                        return (
                                            <ListItem
                                                key={stationId}
                                                to={`/weather/stations/${stationId}`}>
                                                {name}
                                            </ListItem>
                                        )
                                    })}
                                </List>
                            )}
                        </Fulfilled>
                    </Fragment>
                )}
            </containers.Stations>
        </Fragment>
    )
}
function renderMeasurements({ utcOffset }, { loading, data }) {
    return loading || !data ? (
        <Muted>Loading measurements...</Muted>
    ) : (
        <Station utcOffset={utcOffset} measurements={data} />
    )
}
function getTitle({ loading, data }) {
    return loading ? 'Loading...' : data?.name || 'No weather station'
}
