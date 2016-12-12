import React, {PropTypes} from 'react'
import {Link} from 'react-router'
import Sidebar, {Item, Header} from 'components/sidebar'

export default function WeatherSidebar() {
    return (
        <Sidebar>
            <Header>Forecast</Header>
            <Item>
                <Link to='/new/weather'>Mountain Weather Forecast</Link>
            </Item>
            <Item>
                <Link to='/new/weather/hourly-precipitation'>Hourly precipitation</Link>
            </Item>
            <Item>
                <Link to='/new/weather/12h-precipitation'>12 hours precipitation</Link>
            </Item>
            <Item>
                <Link to='/new/weather/temperatures'>Temperatures</Link>
            </Item>
            <Item>
                <Link to='/new/weather/winds'>Winds</Link>
            </Item>
            <Item>
                <Link to='/new/weather/surface-maps'>Surface maps</Link>
            </Item>
            <Item>
                <Link to='/new/weather/other-maps'>500mb & Precipitable water</Link>
            </Item>
            <Header>Current Conditions</Header>
            <Item>
                <Link to='/new/weather/radar'>Radar</Link>
            </Item>
            <Item>
                <Link to='/new/weather/satellite'>Satellite</Link>
            </Item>
            <Item>
                <Link to='/new/weather/actual-temperatures'>Temperatures</Link>
            </Item>
            <Item>
                <Link to='/new/weather/warnings'>Warnings</Link>
            </Item>
        </Sidebar>
    )
}
