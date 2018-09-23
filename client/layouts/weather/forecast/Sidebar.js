import React from 'react'
import { Link } from '@reach/router'
import StaticComponent from 'components/StaticComponent'
import Sidebar, { Item, Header } from 'components/sidebar'

export default class WeatherSidebar extends StaticComponent {
    render() {
        return (
            <Sidebar>
                <Header>Forecast</Header>
                <Item>
                    <Link to="">Mountain Weather Forecast</Link>
                </Item>
                <Item>
                    <Link to="hourly-precipitation">Hourly Precipitation</Link>
                </Item>
                <Item>
                    <Link to="12h-precipitation">12hr Total Precipitation</Link>
                </Item>
                <Item>
                    <Link to="temperatures">Temperatures</Link>
                </Item>
                <Item>
                    <Link to="winds">Winds</Link>
                </Item>
                <Item>
                    <Link to="surface-maps">Surface Maps</Link>
                </Item>
                <Item>
                    <Link to="other-maps">500mb & Precipitable Water</Link>
                </Item>
                <Header>Current Conditions</Header>
                <Item>
                    <Link to="radar">Radar</Link>
                </Item>
                <Item>
                    <Link to="satellite">Satellite</Link>
                </Item>
                <Item>
                    <Link to="actual-temperatures">Temperatures</Link>
                </Item>
                <Item>
                    <Link to="warnings">Warnings</Link>
                </Item>
            </Sidebar>
        )
    }
}
