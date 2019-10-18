import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link, Location } from '@reach/router'
import { Region as SPAWContainer, Alert as SPAWComponent } from 'layouts/SPAW'
import { Navbar, Header, Container, Body, Close } from 'components/page/drawer'
import * as components from 'layouts/products/forecast'
import Shim from 'components/Shim'
import Sponsor from 'layouts/Sponsor'
import DisplayOnMap from 'components/page/drawer/DisplayOnMap'
import { Muted, Warning, Loading } from 'components/text'
import { useForecast } from 'hooks/async/forecast'
import {
    useForecastRegionsMetadata,
    useForecastRegionMetadata,
} from 'hooks/async/features'
import { List, ListItem } from 'components/page'
import * as utils from 'utils/region'
import { handleForecastTabActivate } from 'services/analytics'

Layout.propTypes = {
    name: PropTypes.string.isRequired,
    onCloseClick: PropTypes.func.isRequired,
    onLocateClick: PropTypes.func.isRequired,
}

export default function Layout({ name, onCloseClick, onLocateClick }) {
    const [region, regionPending] = useForecastRegionMetadata(name)
    const [forecast, forecastPending] = useForecast(name)

    return (
        <Container>
            <Navbar>
                <SPAW name={name} />
                <Sponsor label={null} />
                <Close onClick={onCloseClick} />
            </Navbar>
            <Header subject="Avalanche Forecast">
                <h1>
                    {regionPending ? (
                        <Loading component="span" />
                    ) : region ? (
                        <Fragment>
                            <Link to={`/forecasts/${name}`}>{region.name}</Link>
                            <DisplayOnMap
                                onClick={() =>
                                    onLocateClick(utils.geometry(region))
                                }
                            />
                        </Fragment>
                    ) : (
                        <Warning component="span">
                            Forecast {name} not found
                        </Warning>
                    )}
                </h1>
            </Header>
            <Body>
                {forecastPending ? (
                    <Shim all>
                        <Muted>Loading avalanche forecast...</Muted>
                    </Shim>
                ) : forecast ? (
                    <components.Provider value={forecast}>
                        <Shim horizontal>
                            <components.Metadata />
                            <components.Headline />
                        </Shim>
                        <components.TabSet
                            onTabChange={handleForecastTabActivate}
                        />
                        <components.Footer />
                    </components.Provider>
                ) : (
                    <OtherRegions />
                )}
            </Body>
        </Container>
    )
}

// Utils and Constants
function OtherRegions() {
    const [regions] = useForecastRegionsMetadata()

    return (
        <Location>
            {({ location }) => (
                <Shim horizontal as="section">
                    <h3>Click on a link below to see another forecast:</h3>
                    <List column={1}>
                        {regions.map(({ id, name }) => (
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
    )
}

function SPAW({ name }) {
    return (
        <SPAWContainer name={name}>
            {({ link }) => (
                <SPAWComponent link={link} style={{ flex: 1, padding: 0 }} />
            )}
        </SPAWContainer>
    )
}
