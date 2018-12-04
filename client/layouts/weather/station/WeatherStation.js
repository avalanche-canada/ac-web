import React, { PureComponent, Fragment } from 'react'
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

export default class WeatherStation extends PureComponent {
    static propTypes = {
        id: PropTypes.string.isRequired,
    }
    renderMeasurements({ utcOffset }, { loading, data }) {
        return loading || !data ? (
            <Muted>Loading measurements...</Muted>
        ) : (
            <Station utcOffset={utcOffset} measurements={data} />
        )
    }
    renderStation = station => {
        return station ? (
            <Fragment>
                <Metadata {...station} />
                <containers.Measurements id={this.props.id}>
                    {this.renderMeasurements.bind(this, station)}
                </containers.Measurements>
                <Footer />
            </Fragment>
        ) : (
            <Fragment>
                <Headline>
                    Weather station #{this.props.id} does not exist. Click on a
                    link below to see another weather station.
                </Headline>
                <containers.Stations>
                    {() => (
                        <Fragment>
                            <Pending>
                                <Loading>
                                    Loading all weather stations...
                                </Loading>
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
    getTitle({ loading, data }) {
        return loading ? 'Loading...' : data?.name || 'No weather station'
    }
    children = props => (
        <Fragment>
            <Header title={this.getTitle(props)} />
            <Content>
                <Main>
                    <Pending>
                        <Muted>Loading weather station data...</Muted>
                    </Pending>
                    <Fulfilled strict>{this.renderStation}</Fulfilled>
                </Main>
            </Content>
        </Fragment>
    )
    renderError() {
        return (
            <Error>An error happened while loading weather station data.</Error>
        )
    }
    render() {
        return (
            <Page>
                <ErrorBoundary fallback={this.renderError}>
                    <containers.Station id={this.props.id}>
                        {this.children}
                    </containers.Station>
                </ErrorBoundary>
            </Page>
        )
    }
}
