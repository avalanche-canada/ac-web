import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router'
import Sidebar, {Item, Header} from 'components/sidebar'

export default function WeatherSidebar() {
    return (
        <Sidebar>
            <Header>Forecast</Header>
            <Item>
                <Link to='/weather'>Mountain Weather Forecast</Link>
            </Item>
            <Item>
                <Link to='/weather/hourly-precipitation'>Hourly Precipitation</Link>
            </Item>
            <Item>
                <Link to='/weather/12h-precipitation'>12hr Total Precipitation</Link>
            </Item>
            <Item>
                <Link to='/weather/temperatures'>Temperatures</Link>
            </Item>
            <Item>
                <Link to='/weather/winds'>Winds</Link>
            </Item>
            <Item>
                <Link to='/weather/surface-maps'>Surface Maps</Link>
            </Item>
            <Item>
                <Link to='/weather/other-maps'>500mb & Precipitable Water</Link>
            </Item>
            <Header>Current Conditions</Header>
            <Item>
                <Link to='/weather/radar'>Radar</Link>
            </Item>
            <Item>
                <Link to='/weather/satellite'>Satellite</Link>
            </Item>
            <Item>
                <Link to='/weather/actual-temperatures'>Temperatures</Link>
            </Item>
            <Item>
                <Link to='/weather/warnings'>Warnings</Link>
            </Item>
        </Sidebar>
    )
}
