import React from 'react'
import PropTypes from 'prop-types'
import { Link } from '@reach/router'
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
import { LocaleSwitch, useLocale } from 'contexts/intl'
import { FR, EN } from 'constants/locale'
import { AVALANCHE_QUEBEC } from 'constants/owners'

ForecastSidebar.propTypes = {
    isPrintable: PropTypes.bool.isRequired,
}

export default function ForecastSidebar({ isPrintable, ...props }) {
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

export function Kananaskis() {
    const EMAIL = 'avalanche.safety@gov.ab.ca'
    const intl = useIntl()

    return (
        <Sidebar>
            <Item>
                <FormattedMessage
                    description="FX Kananaskis Sidebar"
                    defaultMessage="This Avalanche Bulletin is produced by avalanche forecasters
                        within the Government of Alberta, Kananaskis Country Public
                        Safety Program."
                />
            </Item>
            <Header>
                <FormattedMessage
                    description="FX Kananaskis Sidebar"
                    defaultMessage="Contact"
                />
            </Header>
            <Item>
                <Mailto
                    email={EMAIL}
                    title={intl.formatMessage({
                        description: 'FX Kananaskis Sidebar',
                        defaultMessage:
                            'Email the Kananaskis Country Public Safety Section',
                    })}
                />
            </Item>
            <Item>
                <FormattedMessage
                    description="FX Kananaskis Sidebar"
                    defaultMessage="<phone>403-679-3511</phone> is the Public Safety office phone
                    number (weekdays)"
                    values={{
                        phone(phone) {
                            return <Phone phone={phone} />
                        },
                    }}
                />
            </Item>
            <Item>
                <FormattedMessage
                    description="FX Kananaskis Sidebar"
                    defaultMessage="<phone>403-591-7755</phone> is the dispatch office non-emergency line"
                    values={{
                        phone(phone) {
                            return <Phone phone={phone} />
                        },
                    }}
                />
            </Item>
            <Item>
                <FormattedMessage
                    description="FX Kananaskis Sidebar"
                    defaultMessage="<phone>911</phone> for backcountry rescues and tell them you are in Kananaskis Country"
                    values={{
                        phone(phone) {
                            return <Phone phone={phone} />
                        },
                    }}
                />
            </Item>
            <Header>
                <FormattedMessage
                    description="FX Kananaskis Sidebar"
                    defaultMessage="More information"
                />
            </Header>
            <Item>
                <Link to="/weather">
                    <FormattedMessage
                        description="FX Kananaskis Sidebar"
                        defaultMessage="Your daily Mountain Weather Forecast"
                    />
                </Link>
            </Item>
            <Item>
                <Link to="/blogs">
                    <FormattedMessage
                        description="FX Kananaskis Sidebar"
                        defaultMessage="Visit Avalanche Canada Blog"
                    />
                </Link>
            </Item>
            <Item>
                <Link to="/forecasts/archives/kananaskis">
                    <FormattedMessage
                        description="FX Kananaskis Sidebar"
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

export function AvalancheQuebec({ isPrintable }) {
    const { set } = useLocale()

    return (
        <Sidebar>
            <Item>
                <LocaleSwitch value={FR}>
                    <Link
                        to=""
                        onClick={() => {
                            set(EN)
                        }}>
                        English version
                    </Link>
                </LocaleSwitch>
                <LocaleSwitch value={EN}>
                    <Link
                        to=""
                        onClick={() => {
                            set(FR)
                        }}>
                        Version française
                    </Link>
                </LocaleSwitch>
            </Item>
            <Item>
                <a
                    href="https://avalanchequebec.ca/conditions-chic-chocs#webcamera"
                    target={AVALANCHE_QUEBEC}>
                    <FormattedMessage
                        defaultMessage="Live Chic-Chocs conditions"
                        description="FX Avalanche Quebec Sidebar"
                    />
                </a>
            </Item>
            <Item>
                <a
                    href="https://avalanchequebec.ca/conditions-chic-chocs#rapports-neige"
                    target={AVALANCHE_QUEBEC}>
                    <FormattedMessage
                        defaultMessage="Remote weather stations"
                        description="FX Avalanche Quebec Sidebar"
                    />
                </a>
            </Item>
            <Item>
                <a
                    href="https://avalanchequebec.ca/conditions-chic-chocs#previsions-meteo"
                    target={AVALANCHE_QUEBEC}>
                    <FormattedMessage
                        defaultMessage="Alpine weather forecast"
                        description="FX Avalanche Quebec Sidebar"
                    />
                </a>
            </Item>
            <Item>
                <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLSdrMgZoGjJruYrXE1u4D8ghq5TSnoHpClPbMNgN7zjI-SwTLw/viewform?formkey=dEJFS0hjQ2FnbE02dDNHV21ueUVRR3c6MA#gid=0"
                    target={AVALANCHE_QUEBEC}>
                    <FormattedMessage
                        defaultMessage="Avalanche report"
                        description="FX Avalanche Quebec Sidebar"
                    />
                </a>
            </Item>
            <Item>
                <Link to="/submit">
                    <FormattedMessage
                        defaultMessage="Mountain Information Network"
                        description="FX Avalanche Quebec Sidebar"
                    />
                </Link>
            </Item>
            <Follow
                urls={[
                    'https://www.facebook.com/avalanchequebec',
                    'https://www.instagram.com/avalanche.quebec/',
                ]}
            />
            <Item>
                <a
                    href="https://avalanchequebec.ca/conditions-chic-chocs#mailchimp-widget"
                    target={AVALANCHE_QUEBEC}>
                    <FormattedMessage
                        defaultMessage="Subscribe to our forecasts"
                        description="FX Avalanche Quebec Sidebar"
                    />
                </a>
            </Item>
            <Contact email="info@avalanchequebec.ca" />
            <Item>
                <FormattedMessage
                    description="FX Avalanche Quebec Sidebar"
                    defaultMessage="For backcountry rescue call <phone>911</phone> and tell them you are in the Chic-Chocs"
                    values={{
                        phone(phone) {
                            return <Phone phone={phone} />
                        },
                    }}
                />
            </Item>
            {isPrintable && <Print url={createExternalForecastURL('html')} />}
            <Item>
                <a
                    href="https://avalanchequebec.ca/avalanche_bulletin/"
                    target={AVALANCHE_QUEBEC}>
                    <FormattedMessage
                        defaultMessage="Archives"
                        description="FX Avalanche Quebec Sidebar"
                    />
                </a>
            </Item>
        </Sidebar>
    )
}

// Utils
function createExternalForecastURL(extension) {
    const { pathname, origin } = document.location

    return `${origin}/api${pathname}.${extension}`
}
