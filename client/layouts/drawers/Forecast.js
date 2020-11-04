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
import { useForecasts, useForecast } from 'hooks/async/api/products'
import { List, ListItem } from 'components/page'
import * as utils from 'utils/region'
import { handleForecastTabActivate } from 'services/analytics'
import { Details } from 'components/error'
import { useLocation } from 'router/hooks'
import * as Async from 'contexts/async'
import shim from 'components/Shim.css'
import typography from 'components/text/Text.css'
import { useText, FORECAST } from 'requests/api/types'

ForeastLayout.propTypes = {
    name: PropTypes.string.isRequired,
    onCloseClick: PropTypes.func.isRequired,
    onLocateClick: PropTypes.func.isRequired,
}

export default function ForeastLayout({ name, onCloseClick, onLocateClick }) {
    const subject = useText(FORECAST)
    // "key" in <Body> to mount/remount the tabs, so the first tab appears and
    // scroll gets reset as the name changes

    return (
        <Async.Provider value={useForecast(name)}>
            <Navbar>
                <Sponsor label={null} />
                <Close onClick={onCloseClick} />
            </Navbar>
            <Header subject={subject}>
                <h1>
                    <Async.Pending>
                        <span className={typography.Muted}>Loading...</span>
                    </Async.Pending>
                    <Async.Found>
                        <ForecastRegionHeader onLocateClick={onLocateClick} />
                    </Async.Found>
                    <Async.Empty>
                        <span className={typography.Warning}>
                            Forecast {name} not found
                        </span>
                    </Async.Empty>
                </h1>
            </Header>
            <Body key={name}>
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
            </Body>
        </Async.Provider>
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
    const [forecasts] = useForecasts()

    return (
        <Shim horizontal as="section">
            <h3>Click on a link below to see another forecast:</h3>
            <List column={1}>
                {forecasts.map(({ id, name }) => (
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
