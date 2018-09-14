import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Navbar, Header, Container, Body, Close } from 'components/page/drawer'
import * as components from 'layouts/products/forecast'
import { SPAW as SPAWComponent } from 'components/misc'
import Shim from 'components/Shim'
import Sponsor from 'layouts/Sponsor'
import { Region as SPAW } from 'layouts/SPAW'
import DisplayOnMap from 'components/page/drawer/DisplayOnMap'
import { Muted } from 'components/text'
import { Forecast } from 'containers/forecast'
import { Region } from 'containers/features'
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
    handleLocateClick = () => {
        this.props.onLocateClick(utils.geometry(this.region))
    }
    renderHeader({ data, loading }) {
        this.region = data
        const title = loading || !data ? 'Loading...' : data.name

        return (
            <h1>
                {data ? <Link to={this.link}>{title}</Link> : title}
                {data && <DisplayOnMap onClick={this.handleLocateClick} />}
            </h1>
        )
    }
    children({ loading, data }) {
        const { name, onCloseClick } = this.props

        return (
            <Container>
                <Navbar>
                    <SPAW name={name}>{this.renderSPAW}</SPAW>
                    <Sponsor label={null} />
                    <Close onClick={onCloseClick} />
                </Navbar>
                <Header subject="Avalanche Forecast">
                    <Region name={name}>
                        {props => this.renderHeader(props)}
                    </Region>
                </Header>
                <Body>
                    {loading && (
                        <Shim all>
                            <Muted>Loading avalanche forecast...</Muted>
                        </Shim>
                    )}
                    {data && (
                        <components.Forecast value={data}>
                            <Shim horizontal>
                                <components.Metadata />
                                <components.Headline />
                            </Shim>
                            <components.TabSet />
                            <components.Footer />
                        </components.Forecast>
                    )}
                </Body>
            </Container>
        )
    }
    render() {
        return (
            <Forecast name={this.props.name}>
                {props => this.children(props)}
            </Forecast>
        )
    }
}
