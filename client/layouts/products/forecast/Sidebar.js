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
import { FormattedMessage, useIntl } from 'react-intl'

ForecastSidebar.propTypes = {
    isPrintable: PropTypes.bool.isRequired,
}

function ForecastSidebar({ isPrintable, ...props }) {
    return (
        <Sidebar {...props}>
            <Item>
                <Link to="/weather">
                    <FormattedMessage
                        description="FX Sidebar"
                        defaultMessage="Your daily Mountain Weather Forecast"
                    />
                </Link>
            </Item>
            <Item>
                <Link to="/mountain-information-network/submit">
                    <FormattedMessage
                        description="FX Sidebar"
                        defaultMessage="Submit a Mountain Information Report"
                    />
                </Link>
            </Item>
            <Item>
                <Link to="/blogs">
                    <FormattedMessage
                        description="FX Sidebar"
                        defaultMessage="Visit our Blog"
                    />
                </Link>
            </Item>
            <Item>
                <Link to="/forecasts/archives">
                    <FormattedMessage
                        description="FX Sidebar"
                        defaultMessage="Forecast Archive"
                    />
                </Link>
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
    const intl = useIntl()

    return (
        <Sidebar>
            <Item>
                <FormattedMessage
                    description="FX Sidebar"
                    defaultMessage="This Avalanche Bulletin is produced by avalanche forecasters
                        within the Government of Alberta, Kananaskis Country Public
                        Safety Program."
                />
            </Item>
            <Header>
                <FormattedMessage
                    description="FX Sidebar"
                    defaultMessage="Contact"
                />
            </Header>
            <Item>
                <Mailto
                    email={EMAIL}
                    title={intl.formatMessage({
                        description: 'FX Sidebar',
                        defaultMessage:
                            'Email the Kananaskis Country Public Safety Section',
                    })}
                />
            </Item>
            <Item>
                <Phone phone="403-679-3511" />
                <FormattedMessage
                    description="FX Header"
                    defaultMessage="is the Public Safety office phone
                    number (weekdays)"
                />
            </Item>
            <Item>
                <Phone phone="403-591-7755" />
                <FormattedMessage
                    description="FX Header"
                    defaultMessage="is the dispatch office non-emergency line"
                />
            </Item>
            <Item>
                <Phone phone="911" />
                <FormattedMessage
                    description="FX Header"
                    defaultMessage="for backcountry rescues and tell them you are in Kananaskis Country"
                />
            </Item>
            <Header>
                <FormattedMessage
                    description="FX Header"
                    defaultMessage="More information"
                />
            </Header>
            <Item>
                <Link to="/weather">
                    <FormattedMessage
                        description="FX Header"
                        defaultMessage="Your daily Mountain Weather Forecast"
                    />
                </Link>
            </Item>
            <Item>
                <Link to="/blogs">
                    <FormattedMessage
                        description="FX Header"
                        defaultMessage="Visit Avalanche Canada Blog"
                    />
                </Link>
            </Item>
            <Item>
                <Link to="/forecasts/archives/kananaskis">
                    <FormattedMessage
                        description="FX Header"
                        defaultMessage="Forecast Archive"
                    />
                </Link>
            </Item>
            <Share />
            <Follow urls={['https://www.facebook.com/KCPublicSafety']} />
            <Contact
                email={EMAIL}
                title={intl.formatMessage({
                    description: '',
                    defaultMessage:
                        'Email the Kananaskis Country Public Safety Section',
                })}
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
