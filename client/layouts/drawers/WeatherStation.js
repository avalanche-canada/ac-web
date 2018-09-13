import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import {
    Header,
    Container,
    Body,
    Navbar,
    Content,
    Close,
} from 'components/page/drawer'
import { Metadata, Station, Footer } from 'components/weather/station'
import { Error, Muted } from 'components/text'
import ErrorBoundary from 'components/ErrorBoundary'
import Fetch from 'components/fetch'
import { Link } from 'react-router-dom'
import * as containers from 'containers/weather'
import Sponsor from 'layouts/Sponsor'
import DisplayOnMap from 'components/page/drawer/DisplayOnMap'
import * as utils from 'utils/station'

export default class WeatherStation extends PureComponent {
    static propTypes = {
        id: PropTypes.string.isRequired,
        onCloseClick: PropTypes.func.isRequired,
        onLocateClick: PropTypes.func.isRequired,
    }
    renderHeader(props) {
        const { data } = props
        const { onLocateClick, id } = this.props
        const title = utils.title(props)
        function handleLocateClick() {
            onLocateClick(utils.geometry(data))
        }

        return (
            <h1>
                {data ? <Link to={utils.link(data)}>{title}</Link> : title}
                {data && <DisplayOnMap key={id} onClick={handleLocateClick} />}
            </h1>
        )
    }
    renderMeasurements({ utcOffset }, { data, loading }) {
        return loading || !data ? (
            <Muted>Loading westher station measurements...</Muted>
        ) : (
            <Station utcOffset={utcOffset} measurements={data} />
        )
    }
    renderData = station => {
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
    children = props => (
        <Container>
            <Navbar>
                <Sponsor label={null} />
                <Close onClick={this.props.onCloseClick} />
            </Navbar>
            <Header subject="Weather station">
                {this.renderHeader(props)}
            </Header>
            <Body>
                <Content>
                    <Fetch.Data strict>{this.renderData}</Fetch.Data>
                </Content>
            </Body>
        </Container>
    )
    renderError() {
        return (
            <Error>An error happened while loading weather station data.</Error>
        )
    }
    render() {
        return (
            <ErrorBoundary fallback={this.renderError}>
                <containers.Station id={this.props.id}>
                    {this.children}
                </containers.Station>
            </ErrorBoundary>
        )
    }
}
