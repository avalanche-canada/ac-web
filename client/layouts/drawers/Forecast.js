import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link, Location } from '@reach/router'
import { Navbar, Header, Container, Body, Close } from 'components/page/drawer'
import * as components from 'layouts/products/forecast'
import { SPAW as SPAWComponent } from 'components/misc'
import Shim from 'components/Shim'
import Sponsor from 'layouts/Sponsor'
import { Region as SPAW } from 'layouts/SPAW'
import DisplayOnMap from 'components/page/drawer/DisplayOnMap'
import { Muted, Warning, Loading } from 'components/text'
import { Forecast } from 'containers/forecast'
import { Fulfilled, Pending } from 'components/fetch'
import { Region, Regions } from 'containers/features'
import { List, ListItem } from 'components/page'
import * as utils from 'utils/region'
import { handleForecastTabActivate } from 'services/analytics'

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
    renderHeader({ pending, fulfilled, data }) {
        this.region = data

        return (
            <h1>
                {pending && <Loading component="span" />}
                {fulfilled &&
                    (data ? (
                        <Fragment>
                            <Link to={this.link}>{data.name}</Link>
                            <DisplayOnMap onClick={this.handleLocateClick} />
                        </Fragment>
                    ) : (
                        <Warning component="span">
                            Forecast {this.props.name} not found
                        </Warning>
                    ))}
            </h1>
        )
    }
    children({ data }) {
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
                    <Pending>
                        <Shim all>
                            <Muted>Loading avalanche forecast...</Muted>
                        </Shim>
                    </Pending>
                    <Fulfilled.Found>
                        <components.Forecast value={data}>
                            <Shim horizontal>
                                <components.Metadata />
                                <components.Headline />
                            </Shim>
                            <components.TabSet
                                onTabChange={handleForecastTabActivate}
                            />
                            <components.Footer />
                        </components.Forecast>
                    </Fulfilled.Found>
                    <Fulfilled.NotFound>
                        <Regions>{renderRegions}</Regions>
                    </Fulfilled.NotFound>
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

function renderRegions({ fulfilled, data }) {
    return fulfilled ? (
        <Location>
            {({ location }) => (
                <Shim horizontal>
                    <h3>Click on a link below to see another forecast:</h3>
                    <List column={1}>
                        {data.map(({ id, name }) => (
                            <ListItem
                                key={id}
                                to={`/map/forecasts/${id}${location.search}`}
                                replace>
                                {name}
                            </ListItem>
                        ))}
                    </List>
                </Shim>
            )}
        </Location>
    ) : null
}
