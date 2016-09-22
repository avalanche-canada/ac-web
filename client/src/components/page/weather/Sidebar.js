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
                <Link to='/new/weather/precipitation'>Precipitation</Link>
            </Item>
            <Item>
                <Link to='/new/weather/precipitation-12h'>Precipitation 12h</Link>
            </Item>
            <Item>
                <Link to='/new/weather/temperatures'>Temperatures</Link>
            </Item>
            <Item>
                <Link to='/new/weather/winds'>Winds</Link>
            </Item>
            <Item>
                <Link to='/new/weather/surface-maps'>Surface Maps</Link>
            </Item>
            <Header>Current Conditions</Header>
            <Item>
                <Link to='/new/weather/radar'>Radar</Link>
            </Item>
            <Item>
                <Link to='/new/weather/satellite'>Satellite</Link>
            </Item>
            <Item>
                <Link to='/new/weather/warnings'>Warnings</Link>
            </Item>
        </Sidebar>
    )
}
