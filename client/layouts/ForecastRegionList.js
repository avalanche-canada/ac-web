import React from 'react'
import { ForecastRegions } from 'containers/experiments/store'
import { List, ListItem } from 'components/page'
import { Loading } from 'components/text'
import Page from 'layouts/Page'
import externals from 'router/externals'

function renderer(data) {
    if (data.isEmpty()) {
        return <Loading />
    }

    return (
        <List>
            {data.map(region => {
                const id = region.get('id')
                const name = region.get('name')
                const to = externals.has(id)
                    ? externals.get(id)
                    : `/forecasts/${id}`
                const target = externals.has(id) ? name : null

                return (
                    <ListItem key={id} to={to} target={target}>
                        {name}
                    </ListItem>
                )
            })}
        </List>
    )
}
export default function ForecastRegionList() {
    return (
        <Page
            title="Forecast regions"
            headline="Click on a link below to read the avalanche bulletin.">
            <ForecastRegions>{renderer}</ForecastRegions>
        </Page>
    )
}
