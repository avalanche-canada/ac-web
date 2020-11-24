import React, { Fragment } from 'react'
import { useStations } from 'hooks/async/weather'
import {
    List,
    ListItem,
    Header,
    Content,
    Main,
    Headline,
} from 'components/page'
import { Page } from 'layouts/pages'
import { Loading, Error } from 'components/text'
import * as Async from 'contexts/async'
import { path } from 'utils/station'
import { FormattedMessage } from 'react-intl'

export default function WeatherStationList() {
    const title = (
        <FormattedMessage
            description="Layout weather/station/WeatherStationList"
            defaultMessage="Weather stations"
        />
    )

    return (
        <Page>
            <Header title={title} />
            <Content>
                <Main>
                    <Async.Provider value={useStations()}>
                        <Async.Pending>
                            <Loading>
                                <FormattedMessage
                                    description="Layout weather/station/WeatherStationList"
                                    defaultMessage="Loading weather station data..."
                                />
                            </Loading>
                        </Async.Pending>
                        <Async.Found>
                            {stations => (
                                <Fragment>
                                    <Headline>
                                        <FormattedMessage
                                            description="Layout weather/station/WeatherStationList"
                                            defaultMessage="Click on a link below to see weather
                                    station data."
                                        />
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
                                <FormattedMessage
                                    description="Layout weather/station/WeatherStationList"
                                    defaultMessage="An error happened while loading weather
                                            stations."
                                />
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
