import React, {PropTypes} from 'react'
import {Link} from 'react-router'
import {Sidebar, Item, Header} from 'components/sidebar'

export default function WeatherSidebar({ forecasts, current, onPathChange }) {
    return (
        <Sidebar>
            <Header>Forecast</Header>
            <Item>
                <Link to='/weather'>Mountain Weather Forecast</Link>
            </Item>
            <Item>
                <Link to='/weather/precipitation'>Precipitation</Link>
            </Item>
            <Item>
                <Link to='/weather/precipitation-12h'>Precipitation 12h</Link>
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
            <Header>Current Conditions</Header>
            <Item>
                <Link to='/weather/radar'>Radar</Link>
            </Item>
            <Item>
                <Link to='/weather/satellite'>Satellite</Link>
            </Item>
            <Item>
                <Link to='/weather/warnings'>Warnings</Link>
            </Item>
        </Sidebar>
    )
}
