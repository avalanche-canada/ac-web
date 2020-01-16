import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Link } from '@reach/router'
import { Tag } from 'layouts/SPAW'
import {
    Navbar,
    Header,
    Body,
    Close,
    DisplayOnMap,
} from 'components/page/drawer'
import * as components from 'layouts/products/forecast'
import Shim from 'components/Shim'
import Sponsor from 'layouts/Sponsor'
import { useForecast } from 'hooks/async/forecast'
import {
    useForecastRegionsMetadata,
    useForecastRegionMetadata,
} from 'hooks/async/features'
import { List, ListItem } from 'components/page'
import * as utils from 'utils/region'
import { handleForecastTabActivate } from 'services/analytics'
import { Details } from 'components/error'
import { useLocation } from 'router/hooks'
import * as Async from 'contexts/async'
import shim from 'components/Shim.css'
import typography from 'components/text/Text.css'

ForeastLayout.propTypes = {
    name: PropTypes.string.isRequired,
    onCloseClick: PropTypes.func.isRequired,
    onLocateClick: PropTypes.func.isRequired,
}

export default function ForeastLayout({ name, onCloseClick, onLocateClick }) {
    // "key" in <Body> to mount/remount the tabs, so the first tab appears and
    // scroll gets reset as the name changes

    return (
        <Fragment>
            <Navbar>
                <Sponsor label={null} />
                <Close onClick={onCloseClick} />
            </Navbar>
            <Header subject="Avalanche Forecast">
                <Async.Provider value={useForecastRegionMetadata(name)}>
                    <h1>
                        <Async.Pending>
                            <span className={typography.Muted}>Loading...</span>
                        </Async.Pending>
                        <Async.Found>
                            <ForecastRegionHeader
                                onLocateClick={onLocateClick}
                            />
                        </Async.Found>
                        <Async.Empty>
                            <span className={typography.Warning}>
                                Forecast {name} not found
                            </span>
                        </Async.Empty>
                    </h1>
                </Async.Provider>
            </Header>
            <Body key={name}>
                <Async.Provider value={useForecast(name)}>
                    <Async.Pending>
                        <p className={classnames(typography.Muted, shim.all)}>
                            Loading avalanche forecast...
                        </p>
                    </Async.Pending>
                    <Async.Found>
                        <Forecast />
                    </Async.Found>
                    <Async.FirstError>
                        <Async.NotFound>
                            <OtherRegions />
                        </Async.NotFound>
                        <Async.Error>
                            <Details
                                summary="An error happened while loading forecast."
                                className={shim.all}
                            />
                        </Async.Error>
                    </Async.FirstError>
                </Async.Provider>
            </Body>
        </Fragment>
    )
}

// Utils and Constants
function Forecast({ payload }) {
    return (
        <components.Provider value={payload}>
            <Shim horizontal>
                <components.Metadata />
                <components.Headline />
            </Shim>
            <components.TabSet onTabChange={handleForecastTabActivate} />
            <components.Footer />
        </components.Provider>
    )
}
function OtherRegions() {
    const { location } = useLocation()
    const [regions] = useForecastRegionsMetadata()

    return (
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
    )
}

function ForecastRegionHeader({ payload, onLocateClick }) {
    const { id, name } = payload

    return (
        <Fragment>
            <div style={HEADER_STYLE}>
                <Tag region={id} as={Link} to="/spaw" />
                <Link to={`/forecasts/${id}`}>{name}</Link>
            </div>
            <DisplayOnMap
                onClick={() => onLocateClick(utils.geometry(payload))}
            />
        </Fragment>
    )
}

const HEADER_STYLE = {
    display: 'flex',
    alignItems: 'center',
}
