import React from 'react'
import { Stations } from 'containers/weather'
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
import { Fulfilled, Pending } from 'components/fetch'
import { Error, Muted } from 'components/text'
import { path } from 'utils/station'

export default function WeatherStationList() {
    const error = (
        <Error>
            Oups!! An error happened while loading weather station data.
        </Error>
    )
    function renderItem({ stationId, name }) {
        return (
            <ListItem key={stationId} to={path(stationId)}>
                {name}
            </ListItem>
        )
    }
    function renderPage() {
        return (
            <Page>
                <Header title="Weather stations" />
                <Content>
                    <Main>
                        <Pending>
                            <Muted>Loading weather station data...</Muted>
                        </Pending>
                        <Fulfilled>
                            <Headline>
                                Click on a link below to see weather station
                                data.
                            </Headline>
                            <List renderItem={renderItem} />
                        </Fulfilled>
                    </Main>
                </Content>
            </Page>
        )
    }

    return (
        <ErrorBoundary fallback={error}>
            <Stations>{renderPage}</Stations>
        </ErrorBoundary>
    )
}
