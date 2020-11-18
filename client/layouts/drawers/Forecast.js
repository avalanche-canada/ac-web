import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Link } from '@reach/router'
import { FormattedMessage } from 'react-intl'
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
import { useProduct } from 'hooks/async/api/products'
import { useMetadata } from 'hooks/async/api/metadata'
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
    slug: PropTypes.string.isRequired,
    onCloseClick: PropTypes.func.isRequired,
    onLocateClick: PropTypes.func.isRequired,
}

export default function ForeastLayout({ slug, onCloseClick, onLocateClick }) {
    // "key" in <Body> to mount/remount the tabs, so the first tab appears and
    // scroll gets reset as the slug changes
    const subject = useText(FORECAST)

    return (
        <Async.Provider value={useProduct(slug)}>
            <Navbar>
                <Sponsor label={null} />
                <Close onClick={onCloseClick} />
            </Navbar>
            <Header subject={subject}>
                <h1>
                    <Async.Pending>
                        <span className={typography.Muted}>
                            <FormattedMessage
                                description="Layout drawers/Forecast"
                                defaultMessage="Loading..."
                            />
                        </span>
                    </Async.Pending>
                    <Async.Found>
                        <ForecastRegionHeader onLocateClick={onLocateClick} />
                    </Async.Found>
                    <Async.Empty>
                        <span className={typography.Warning}>
                            <FormattedMessage
                                description="Layout drawers/Forecast"
                                defaultMessage="Forecast {slug} not found"
                                values={{ slug }}
                            />
                        </span>
                    </Async.Empty>
                </h1>
            </Header>
            <Body key={slug}>
                <Async.Pending>
                    <p className={classnames(typography.Muted, shim.all)}>
                        <FormattedMessage
                            description="Layout drawers/Forecast"
                            defaultMessage="Loading avalanche forecast..."
                        />
                    </p>
                </Async.Pending>
                <Async.Found>
                    <Forecast onLocateClick={onLocateClick} />
                </Async.Found>
                <Async.FirstError>
                    <Async.NotFound>
                        <OtherRegions />
                    </Async.NotFound>
                    <Async.Error>
                        <Details
                            className={shim.all}
                            summary={
                                <FormattedMessage
                                    defaultMessage="An error happened while loading the forecast."
                                    description="Layout drawers/Forecast"
                                />
                            }
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
    const [forecasts] = useMetadata()

    return (
        <Shim horizontal as="section">
            <h3>
                <FormattedMessage
                    description="Layout drawers/Forecast"
                    defaultMessage="Click on a link below to see another forecast:"
                />
            </h3>
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
    const { slug, report } = payload

    return (
        <Fragment>
            <div style={HEADER_STYLE}>
                <Tag region={slug} as={Link} to="/spaw" />
                <Link to={`/forecasts/${slug}`}>{report.title}</Link>
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
