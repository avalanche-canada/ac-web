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
    renderHeader = ({ data, loading }) => {
        const { onLocateClick } = this.props
        const title = loading || !data ? 'Loading...' : data.name
        function handleLocateClick() {
            onLocateClick(utils.geometry(data))
        }

        return (
            <Header subject="Avalanche Forecast">
                <h1>
                    {data ? <Link to={this.link}>{title}</Link> : title}
                    {data && <DisplayOnMap onClick={handleLocateClick} />}
                </h1>
            </Header>
        )
    }
    children = ({ loading, data }) => {
        const { name, onCloseClick } = this.props

        return (
            <Container>
                <Navbar>
                    <SPAW name={name}>{this.renderSPAW}</SPAW>
                    <Sponsor label={null} />
                    <Close onClick={onCloseClick} />
                </Navbar>
                <Region name={name}>{this.renderHeader}</Region>
                <Body>
                    {data ? (
                        <components.Forecast value={data}>
                            <Shim horizontal>
                                <components.Metadata />
                                <components.Headline />
                            </Shim>
                            <components.TabSet />
                            <components.Footer />
                        </components.Forecast>
                    ) : (
                        <Shim all>
                            <Muted>Loading avalanche forecast...</Muted>
                        </Shim>
                    )}
                </Body>
            </Container>
        )
    }
    render() {
        return <Forecast name={this.props.name}>{this.children}</Forecast>
    }
}
