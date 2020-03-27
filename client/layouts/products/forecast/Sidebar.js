import React from 'react'
import PropTypes from 'prop-types'
import { Link } from '@reach/router'
import { memo } from 'utils/react'
import {
    Sidebar,
    Header,
    Contact,
    Follow,
    Share,
    Item,
    RSSFeed,
    Print,
} from 'components/sidebar'
import { Mailto, Phone } from 'components/anchors'
import { FORECASTERS } from 'constants/emails'

ForecastSidebar.propTypes = {
    isPrintable: PropTypes.bool.isRequired,
}

function ForecastSidebar({ isPrintable, ...props }) {
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
            <RSSFeed url={createExternalForecastURL('rss')} />
            {isPrintable && <Print url={createExternalForecastURL('html')} />}
        </Sidebar>
    )
}

export default memo.static(ForecastSidebar)

export function Kananaskis() {
    const EMAIL = 'avalanche.safety@gov.ab.ca'

    return (
        <Sidebar>
            <Item>
                This Avalanche Bulletin is produced by avalanche forecasters
                within the Government of Alberta, Kananaskis Country Public
                Safety Program.
            </Item>
            <Header>Contact</Header>
            <Item>
                <Mailto
                    email={EMAIL}
                    title="Email the Kananaskis Country Public Safety Section"
                />
            </Item>
            <Item>
                <Phone phone="403-679-3511" /> is the Public Safety office phone
                number (weekdays)
            </Item>
            <Item>
                <Phone phone="403-591-7755" /> is the dispatch office
                non-emergency line
            </Item>
            <Item>
                <Phone phone="911" /> for backcountry rescues and tell them you
                are in Kananaskis Country
            </Item>
            <Header>More information</Header>
            <Item>
                <Link to="/weather">Your daily Mountain Weather Forecast</Link>
            </Item>
            <Item>
                <Link to="/blogs">Visit Avalanche Canada Blog</Link>
            </Item>
            <Item>
                <Link to="/forecasts/archives/kananaskis">
                    Forecast Archive
                </Link>
            </Item>
            <Share />
            <Follow urls={['https://www.facebook.com/KCPublicSafety']} />
            <Contact
                email={EMAIL}
                title="Email the Kananaskis Country Public Safety Section"
            />
            <RSSFeed url={createExternalForecastURL('rss')} />
        </Sidebar>
    )
}

// Utils
function createExternalForecastURL(extension) {
    const { pathname, origin } = document.location

    return `${origin}/api${pathname}.${extension}`
}
