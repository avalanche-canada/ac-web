import React from 'react'
import { HotZones } from 'containers/experiments/store'
import { List, ListItem } from 'components/page'
import { Loading } from 'components/text'
import Page from 'layouts/Page'

function renderer(data) {
    if (data.isEmpty()) {
        return <Loading />
    }

    return (
        <List>
            {data.map(zone => {
                const id = zone.get('id')

                return (
                    <ListItem key={id} to={`/hot-zone-reports/${id}`}>
                        {zone.get('name')}
                    </ListItem>
                )
            })}
        </List>
    )
}
export default function HotZoneList() {
    return (
        <Page
            title="Hot zones"
            headline="Click on a link below to read the Hot Zone report.">
            <HotZones>{renderer}</HotZones>
        </Page>
    )
}
