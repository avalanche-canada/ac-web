import React from 'react'
import PropTypes from 'prop-types'
import { onlyUpdateForKey } from 'compose'
import {Link} from 'react-router-dom'
import {
    Sidebar as Base,
    Contact,
    Follow,
    Share,
    Item,
    RSSFeed,
    Print,
} from 'components/sidebar'
import { FORECASTERS } from 'constants/emails'

Sidebar.propTypes = {
    isPrintable: PropTypes.bool.isRequired,
}

function Sidebar({ isPrintable, ...props }) {
    const { pathname, origin } = document.location

    return (
        <Base {...props}>
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
        </Base>
    )
}

export default onlyUpdateForKey('isPrintable')(Sidebar)
