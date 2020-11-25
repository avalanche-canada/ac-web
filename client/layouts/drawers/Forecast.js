import React, { Fragment, useCallback } from 'react'
import classnames from 'classnames'
import { Link, Redirect } from '@reach/router'
import { FormattedMessage } from 'react-intl'
import { Tag } from 'layouts/SPAW'
import { Navbar, Header, Body, Close, DisplayOnMap } from 'components/page/drawer'
import * as Components from 'layouts/products/forecast'
import Shim from 'components/Shim'
import Sponsor from 'layouts/Sponsor'
import { useForecast } from 'hooks/async/api/products'
import { Loading } from 'components/text'
import { handleForecastTabActivate } from 'services/analytics'
import { Details } from 'components/error'
import * as Async from 'contexts/async'
import { useFitBounds, usePrimaryDrawer } from 'layouts/main/drawers/hooks'
import { useAreas } from 'hooks/async/api/areas'
import { useName } from 'constants/products/names'
import { FORECAST } from 'constants/products'
import typography from 'components/text/Text.module.css'
import * as ForecastRegionList from 'layouts/pages/ForecastRegionList'
import shim from 'components/Shim.module.css'

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
                    <Async.NotFound>
                        <span className={typography.Warning}>
                            <FormattedMessage
                                description="Layout drawers/Forecast"
                                defaultMessage="Forecast {id} not found"
                                values={{ id }}
                            />
                        </span>
                    </Async.NotFound>
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
                        <Shim horizontal>
                            <p>
                                <ForecastRegionList.Headline />
                            </p>
                            <ForecastRegionList.Content column={1} />
                        </Shim>
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
// TODO Reuse that piece of code...
function ForecastContent({ payload }) {
    if (payload.owner.isExternal) {
        window.open(payload.url, payload.slug)

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
