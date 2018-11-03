import React from 'react'
import { Link } from '@reach/router'
import { memo } from 'utils/react'
import {
    Sidebar,
    Contact,
    Follow,
    Share,
    Item,
    Header,
    RSSFeed,
} from 'components/sidebar'
import { Mailto, Phone } from 'components/anchors'

function KananaskisSidebar() {
    const { pathname, origin } = document.location
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
                <Phone phone="403-678-5508" ext="273" /> is the Public Safety
                office phone number (weekdays)
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
                <Link to="/mountain-information-network/submit">
                    Submit a Mountain Information Report
                </Link>
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
            <RSSFeed url={`${origin}/api${pathname}.rss`} />
        </Sidebar>
    )
}

export default memo.static(KananaskisSidebar)
