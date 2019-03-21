import React, { useCallback, memo, Fragment } from 'react'
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

Layout.propTypes = {
    name: PropTypes.string.isRequired,
    onCloseClick: PropTypes.func.isRequired,
    onLocateClick: PropTypes.func.isRequired,
}

function Layout({ name, onCloseClick, onLocateClick }) {
    const renderHeader = useCallback(
        ({ pending, fulfilled, data }) => (
            <h1>
                {pending && <Loading component="span" />}
                {fulfilled &&
                    (data ? (
                        <Fragment>
                            <Link to={`/forecasts/${name}`}>{data.name}</Link>
                            <DisplayOnMap
                                onClick={() =>
                                    onLocateClick(utils.geometry(data))
                                }
                            />
                        </Fragment>
                    ) : (
                        <Warning component="span">
                            Forecast {name} not found
                        </Warning>
                    ))}
            </h1>
        ),
        [name]
    )

    return (
        <Forecast name={name}>
            {({ data }) => (
                <Container>
                    <Navbar>
                        <SPAW name={name}>{renderSPAW}</SPAW>
                        <Sponsor label={null} />
                        <Close onClick={onCloseClick} />
                    </Navbar>
                    <Header subject="Avalanche Forecast">
                        <Region name={name}>{renderHeader}</Region>
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
            )}
        </Forecast>
    )
}

export default memo(Layout, (prev, next) => prev.name === next.name)

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
function renderSPAW({ link }) {
    return <SPAWComponent link={link} style={SPAW_STYLE} />
}
const SPAW_STYLE = {
    flex: 1,
}
