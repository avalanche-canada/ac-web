import React, { Fragment, useCallback } from 'react'
import classnames from 'classnames'
import { Link, Redirect } from '@reach/router'
import { FormattedMessage } from 'react-intl'
import { Tag } from 'layouts/SPAW'
import {
    Navbar,
    Header,
    Body,
    Close,
    DisplayOnMap,
} from 'components/page/drawer'
import * as Components from 'layouts/products/forecast'
import Shim from 'components/Shim'
import Sponsor from 'layouts/Sponsor'
import { useForecast } from 'hooks/async/api/products'
import { useMetadata } from 'hooks/async/api/metadata'
import { List, ListItem } from 'components/page'
import { Loading } from 'components/text'
import { handleForecastTabActivate } from 'services/analytics'
import { Details } from 'components/error'
import { useLocation } from 'router/hooks'
import * as Async from 'contexts/async'
import shim from 'components/Shim.css'
import typography from 'components/text/Text.css'
import { useFitBounds, usePrimaryDrawer } from 'layouts/main/drawers/hooks'
import { useAreas } from 'hooks/async/api/areas'
import { useName } from 'constants/products/names'
import { FORECAST } from 'constants/products'

export default function ForeastDrawer() {
    // "key" in <Body> to mount/remount the tabs, so the first tab appears and
    // scroll gets reset as the slug changes
    const { id, close } = usePrimaryDrawer()

    return (
        <Async.Provider value={useForecast(id)}>
            <Navbar>
                <Sponsor label={null} />
                <Close onClick={close} />
            </Navbar>
            <Header subject={useName(FORECAST)}>
                <h1>
                    <Async.Pending>
                        <Loading as="span" />
                    </Async.Pending>
                    <Async.Found>
                        <ForecastRegionHeader />
                    </Async.Found>
                    <Async.Empty>
                        <span className={typography.Warning}>
                            <FormattedMessage
                                description="Layout drawers/Forecast"
                                defaultMessage="Forecast {id} not found"
                                values={{ id }}
                            />
                        </span>
                    </Async.Empty>
                </h1>
            </Header>
            <Body key={id}>
                <Async.Pending>
                    <p className={classnames(typography.Muted, shim.all)}>
                        <FormattedMessage
                            description="Layout drawers/Forecast"
                            defaultMessage="Loading avalanche forecast..."
                        />
                    </p>
                </Async.Pending>
                <Async.Found>
                    <ForecastContent />
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
function ForecastContent({ payload }) {
    if (payload.owner.isExternal) {
        open(payload.url, payload.slug)

        return <Redirect to="/map" />
    }

    return (
        <Components.Provider value={payload}>
            <Shim horizontal>
                <Components.Metadata />
                <Components.Headline />
            </Shim>
            <Components.TabSet onTabChange={handleForecastTabActivate} />
            <Components.Footer />
        </Components.Provider>
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

function ForecastRegionHeader({ payload: forecast }) {
    const { id, slug = id } = forecast
    const { title } = forecast.report
    const [areas] = useAreas()
    const area = areas?.features.find(area => area.id === forecast.area.id)
    const fitBounds = useFitBounds()

    const handleLocateClick = useCallback(() => {
        fitBounds(area?.bbox)
    }, [fitBounds, area])

    return (
        <Fragment>
            <div style={HEADER_STYLE}>
                <Tag region={slug} as={Link} to="/spaw" />
                <Link to={`/forecasts/${slug}`}>{title}</Link>
            </div>
            <DisplayOnMap onClick={handleLocateClick} />
        </Fragment>
    )
}

const HEADER_STYLE = {
    display: 'flex',
    alignItems: 'center',
}
