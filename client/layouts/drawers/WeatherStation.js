import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Header, Container, Body, Navbar, Close } from 'components/page/drawer'
import { Metadata, Station, Footer } from 'components/weather/station'
import { Status } from 'components/misc'
import { Link } from 'react-router-dom'
import WeatherStationContainer from 'containers/WeatherStation'
import Sponsor from 'layouts/Sponsor'
import DisplayOnMap from 'components/page/drawer/DisplayOnMap'
import * as utils from 'utils/station'

export default class WeatherStation extends PureComponent {
    static propTypes = {
        id: PropTypes.string.isRequired,
        onCloseClick: PropTypes.func.isRequired,
        onLocateClick: PropTypes.func.isRequired,
    }
    renderHeader(entity, status) {
        const { onLocateClick } = this.props
        const title = utils.title(entity, status)
        function handleLocateClick() {
            onLocateClick(utils.geometry(entity))
        }

        return (
            <h1>
                {entity ? <Link to={utils.link(entity)}>{title}</Link> : title}
                {status.isLoaded && (
                    <DisplayOnMap onClick={handleLocateClick} />
                )}
            </h1>
        )
    }
    children = ({ entity, status }) => (
        <Container>
            <Navbar>
                <Sponsor label={null} />
                <Close onClick={this.props.onCloseClick} />
            </Navbar>
            <Header subject="Weather station">
                {this.renderHeader(entity, status)}
            </Header>
            <Body>
                <Status {...status} />
                {Metadata.render(entity)}
                {Station.render(entity)}
                <Footer />
            </Body>
        </Container>
    )
    render() {
        return (
            <WeatherStationContainer id={this.props.id}>
                {this.children}
            </WeatherStationContainer>
        )
    }
}
