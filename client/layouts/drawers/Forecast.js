import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Navbar, Header, Container, Body, Close } from 'components/page/drawer'
import Forecast, { Metadata } from 'components/forecast'
import { Status, SPAW as SPAWComponent } from 'components/misc'
import Sponsor from 'layouts/Sponsor'
import { Region as SPAW } from 'layouts/SPAW'
import DisplayOnMap from './DisplayOnMap'
import ForecastContainer from 'containers/Forecast'
import * as utils from 'utils/region'

export default class Layout extends PureComponent {
    static propTypes = {
        name: PropTypes.string.isRequired,
        onCloseClick: PropTypes.func.isRequired,
        onLocateClick: PropTypes.func.isRequired,
    }
    get link() {
        return `/forecasts/${this.props.name}`
    }
    get shareUrl() {
        return `${window.location.origin}${this.link}`
    }
    renderSPAW = ({ link }) => {
        const style = {
            flex: 1,
        }

        return <SPAWComponent link={link} style={style} />
    }
    renderHeader(region, forecast, status) {
        const { onLocateClick } = this.props
        let title = status.messages.isLoading

        if (forecast) {
            title = forecast.get('bulletinTitle')
        } else if (region) {
            title = region.get('name')
        }

        function handleLocateClick() {
            onLocateClick(utils.geometry(region))
        }

        return (
            <Header subject="Avalanche Forecast">
                <h1>
                    <Link to={this.link}>{title}</Link>
                    {region && <DisplayOnMap onClick={handleLocateClick} />}
                </h1>
            </Header>
        )
    }
    children = ({ region, forecast, status }) => [
        this.renderHeader(region, forecast, status),
        <Body>
            <Status {...status} />
            {forecast && Metadata.render(forecast)}
            {forecast && Forecast.render(forecast)}
        </Body>,
    ]
    render() {
        return (
            <Container>
                <Navbar>
                    <SPAW name={this.props.name}>{this.renderSPAW}</SPAW>
                    <Sponsor label={null} />
                    <Close onClick={this.props.onCloseClick} />
                </Navbar>
                <ForecastContainer name={this.props.name}>
                    {this.children}
                </ForecastContainer>
            </Container>
        )
    }
}
