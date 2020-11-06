import React from 'react'
import { Link } from '@reach/router'
import { FormattedMessage } from 'react-intl'
import Sidebar, { Item, Header } from 'components/sidebar'
import * as url from 'utils/url'

export default function WeatherSidebar() {
    const root = '/weather'
    const forecast = url.path.bind(null, root, 'forecast')

    return (
        <Sidebar>
            <Header>Forecast</Header>
            <Item>
                <Link to={forecast()}>
                    <FormattedMessage
                        description="Layout weather/forecast/Sidebar"
                        defaultMessage="Mountain Weather Forecast"
                    />
                </Link>
            </Item>
            <Item>
                <Link to={forecast('hourly-precipitation')}>
                    <FormattedMessage
                        description="Layout weather/forecast/Sidebar"
                        defaultMessage="Hourly Precipitation"
                    />
                </Link>
            </Item>
            <Item>
                <Link to={forecast('12h-precipitation')}>
                    <FormattedMessage
                        description="Layout weather/forecast/Sidebar"
                        defaultMessage="12hr Total Precipitation"
                    />
                </Link>
            </Item>
            <Item>
                <Link to={forecast('temperatures')}>
                    <FormattedMessage
                        description="Layout weather/forecast/Sidebar"
                        defaultMessage="Temperatures"
                    />
                </Link>
            </Item>
            <Item>
                <Link to={forecast('winds')}>
                    <FormattedMessage
                        description="Layout weather/forecast/Sidebar"
                        defaultMessage="Winds"
                    />
                </Link>
            </Item>
            <Item>
                <Link to={forecast('surface-maps')}>
                    <FormattedMessage
                        description="Layout weather/forecast/Sidebar"
                        defaultMessage="Surface Maps"
                    />
                </Link>
            </Item>
            <Item>
                <Link to={forecast('other-maps')}>
                    <FormattedMessage
                        description="Layout weather/forecast/Sidebar"
                        defaultMessage="500 mb & Precipitable Water"
                    />
                </Link>
            </Item>
            <Header>
                <FormattedMessage
                    description="Layout weather/forecast/Sidebar"
                    defaultMessage="Current Conditions"
                />
            </Header>
            <Item>
                <Link to={forecast('radar')}>
                    <FormattedMessage
                        description="Layout weather/forecast/Sidebar"
                        defaultMessage="Radar"
                    />
                </Link>
            </Item>
            <Item>
                <Link to={forecast('satellite')}>
                    <FormattedMessage
                        description="Layout weather/forecast/Sidebar"
                        defaultMessage="Satellite"
                    />
                </Link>
            </Item>
            <Item>
                <Link to={forecast('actual-temperatures')}>
                    <FormattedMessage
                        description="Layout weather/forecast/Sidebar"
                        defaultMessage="Temperatures"
                    />
                </Link>
            </Item>
            <Item>
                <Link to={forecast('warnings')}>
                    <FormattedMessage
                        description="Layout weather/forecast/Sidebar"
                        defaultMessage="Warnings"
                    />
                </Link>
            </Item>
            <Header>
                <Link to={url.path(root, 'glossary')}>
                    <FormattedMessage
                        description="Layout weather/forecast/Sidebar"
                        defaultMessage="Weather Glossary"
                    />
                </Link>
            </Header>
        </Sidebar>
    )
}
