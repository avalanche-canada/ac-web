import React, { PureComponent } from 'react'
import WeatherStations from 'containers/WeatherStations'
import {
    List,
    ListItem,
    Page,
    Header,
    Content,
    Main,
    Headline,
} from 'components/page'
import { Status } from 'components/misc'

export default class WeatherStationList extends PureComponent {
    children = stations => [
        stations.isEmpty() || (
            <Headline>
                Click on a link below to see weather station data.
            </Headline>
        ),
        <Status isLoading={stations.isEmpty()} />,
        <List>
            {stations.map(item => {
                const id = item.get('stationId')

                return (
                    <ListItem key={id} to={`/weather/stations/${id}`}>
                        {item.get('name')}
                    </ListItem>
                )
            })}
        </List>,
    ]
    render() {
        return (
            <Page>
                <Header title="Weather stations" />
                <Content>
                    <Main>
                        <WeatherStations>{this.children}</WeatherStations>
                    </Main>
                </Content>
            </Page>
        )
    }
}
