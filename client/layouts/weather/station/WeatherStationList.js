import React, { Fragment } from 'react'
import { useStations } from 'hooks/weather'
import ErrorBoundary from 'components/ErrorBoundary'
import {
    List,
    ListItem,
    Page,
    Header,
    Content,
    Main,
    Headline,
} from 'components/page'
import { Error, Muted } from 'components/text'
import { path } from 'utils/station'

export default function WeatherStationList() {
    const [stations, pending] = useStations()
    const error = (
        <Error>
            Oups!! An error happened while loading weather station data.
        </Error>
    )

    return (
        <ErrorBoundary fallback={error}>
            <Page>
                <Header title="Weather stations" />
                <Content>
                    <Main>
                        {pending ? (
                            <Muted>Loading weather station data...</Muted>
                        ) : (
                            <Fragment>
                                <Headline>
                                    Click on a link below to see weather station
                                    data.
                                </Headline>
                                <List data={stations} renderItem={renderItem} />
                            </Fragment>
                        )}
                    </Main>
                </Content>
            </Page>
        </ErrorBoundary>
    )
}

// Utils
function renderItem({ stationId, name }) {
    return (
        <ListItem key={stationId} to={path(stationId)}>
            {name}
        </ListItem>
    )
}
