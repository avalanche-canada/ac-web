import React from 'react'
import { Link } from '@reach/router'
import Sidebar, { Item, Header } from 'components/sidebar'
import * as url from 'utils/url'

export default function WeatherSidebar() {
    const root = '/weather'
    const forecast = url.path.bind(null, root, 'forecast')

    return (
        <Sidebar>
            <Header>Forecast</Header>
            <Item>
                <Link to={forecast()}>Mountain Weather Forecast</Link>
            </Item>
            <Item>
                <Link to={forecast('hourly-precipitation')}>
                    Hourly Precipitation
                </Link>
            </Item>
            <Item>
                <Link to={forecast('12h-precipitation')}>
                    12hr Total Precipitation
                </Link>
            </Item>
            <Item>
                <Link to={forecast('temperatures')}>Temperatures</Link>
            </Item>
            <Item>
                <Link to={forecast('winds')}>Winds</Link>
            </Item>
            <Item>
                <Link to={forecast('surface-maps')}>Surface Maps</Link>
            </Item>
            <Item>
                <Link to={forecast('other-maps')}>
                    500 mb & Precipitable Water
                </Link>
            </Item>
            <Header>Current Conditions</Header>
            <Item>
                <Link to={forecast('radar')}>Radar</Link>
            </Item>
            <Item>
                <Link to={forecast('satellite')}>Satellite</Link>
            </Item>
            <Item>
                <Link to={forecast('actual-temperatures')}>Temperatures</Link>
            </Item>
            <Item>
                <Link to={forecast('warnings')}>Warnings</Link>
            </Item>
            <Header>
                <Link to={url.path(root, 'glossary')}>Weather Glossary</Link>
            </Header>
        </Sidebar>
    )
}
