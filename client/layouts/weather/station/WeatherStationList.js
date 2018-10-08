import React, { PureComponent, Fragment } from 'react'
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

export default class WeatherStationList extends PureComponent {
    renderData(data) {
        return (
            <Fragment>
                <Headline>
                    Click on a link below to see weather station data.
                </Headline>
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
            </Fragment>
        )
    }
    children = () => (
        <Fragment>
            <Pending>
                <Muted>Loading weather station data...</Muted>
            </Pending>
            <Fulfilled strict>{this.renderData}</Fulfilled>
        </Fragment>
    )
    renderError() {
        return (
            <Error>
                Oups!! An error happened while loading weather station data.
            </Error>
        )
    }
    render() {
        return (
            <Page>
                <Header title="Weather stations" />
                <Content>
                    <Main>
                        <ErrorBoundary fallback={this.renderError}>
                            <Stations>{this.children}</Stations>
                        </ErrorBoundary>
                    </Main>
                </Content>
            </Page>
        )
    }
}
