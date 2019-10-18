import React, { Fragment } from 'react'
import { useStations } from 'hooks/async/weather'
import {
    List,
    ListItem,
    Page,
    Header,
    Content,
    Main,
    Headline,
} from 'components/page'
import { Loading, Error } from 'components/text'
import * as Async from 'contexts/async'
import { path } from 'utils/station'

export default function WeatherStationList() {
    return (
        <Page>
            <Header title="Weather stations" />
            <Content>
                <Main>
                    <Async.Provider value={useStations()}>
                        <Async.Pending>
                            <Loading>Loading weather station data...</Loading>
                        </Async.Pending>
                        <Async.Found>
                            {stations => (
                                <Fragment>
                                    <Headline>
                                        Click on a link below to see weather
                                        station data.
                                    </Headline>
                                    <List
                                        data={stations}
                                        renderItem={renderItem}
                                    />
                                </Fragment>
                            )}
                        </Async.Found>
                        <Async.HTTPError>
                            <Error>
                                An error happened while loading weather
                                stations.
                            </Error>
                        </Async.HTTPError>
                    </Async.Provider>
                </Main>
            </Content>
        </Page>
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
