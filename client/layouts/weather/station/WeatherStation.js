import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Page, Content, Header, Main } from 'components/page'
import { Metadata, Station, Footer } from 'components/weather/station'
import { Error, Muted } from 'components/text'
import ErrorBoundary from 'components/ErrorBoundary'
import Fetch from 'components/fetch'
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
        return (
            <Fragment>
                <Metadata {...station} />
                <containers.Measurements id={this.props.id}>
                    {this.renderMeasurements.bind(this, station)}
                </containers.Measurements>
                <Footer />
            </Fragment>
        )
    }
    getTitle({ loading, data }) {
        return loading ? 'Loading...' : data?.name || 'No station'
    }
    children = props => (
        <Fragment>
            <Header title={this.getTitle(props)} />
            <Content>
                <Main>
                    <Fetch.Loading>
                        <Muted>Loading weather station data...</Muted>
                    </Fetch.Loading>
                    <Fetch.Data strict>{this.renderStation}</Fetch.Data>
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
