import React from 'react'
import PropTypes from 'prop-types'
import { Link } from '@reach/router'
import { memo } from 'utils/react'
import {
    Sidebar,
    Contact,
    Follow,
    Share,
    Item,
    RSSFeed,
    Print,
} from 'components/sidebar'
import { FORECASTERS } from 'constants/emails'

ForecastSidebar.propTypes = {
    isPrintable: PropTypes.bool.isRequired,
}

function ForecastSidebar({ isPrintable, ...props }) {
    const { pathname, origin } = document.location

    return (
        <Sidebar {...props}>
            <Item>
                <Link to="/weather">Your daily Mountain Weather Forecast</Link>
            </Item>
            <Item>
                <Link to="/mountain-information-network/submit">
                    Submit a Mountain Information Report
                </Link>
            </Item>
            <Item>
                <Link to="/blogs">Visit our Blog</Link>
            </Item>
            <Item>
                <Link to="/forecasts/archives">Forecast Archive</Link>
            </Item>
            <Follow />
            <Share />
            <Contact email={FORECASTERS} />
            <RSSFeed url={`${origin}/api${pathname}.rss`} />
            {isPrintable && <Print url={`${origin}/api${pathname}.html`} />}
        </Sidebar>
    )
}

export default memo.static(ForecastSidebar)
