import React from 'react'
import { WeatherStations } from 'containers/experiments/store'
import Page from './Page'
import { List, ListItem } from 'components/page'
import { Loading } from 'components/text'

export default function WeatherStationList() {
    return (
        <Page
            title="Weather stations"
            headline="Click on a link below to see weather station data.">
            <WeatherStations>{renderer}</WeatherStations>
        </Page>
    )
}

function renderer(items) {
    if (items.isEmpty()) {
        return <Loading />
    }

    return (
        <List>
            {items.map(item => {
                const id = item.get('stationId')

                return (
                    <ListItem key={id} to={`/weather/stations/${id}`}>
                        {item.get('name')}
                    </ListItem>
                )
            })}
        </List>
    )
}
