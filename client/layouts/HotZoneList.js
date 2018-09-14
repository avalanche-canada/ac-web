import React from 'react'
import { HotZones } from 'containers/features'
import { List, ListItem } from 'components/page'
import { Loading } from 'components/text'
import Page from 'layouts/Page'

export default function HotZoneList() {
    return (
        <Page
            title="Hot zones"
            headline="Click on a link below to read the Hot Zone report.">
            <HotZones>{renderer}</HotZones>
        </Page>
    )
}

function renderer({ loading, data }) {
    if (loading || !data) {
        return <Loading />
    }

    return (
        <List>
            {data.map(({ id, name }) => {
                return (
                    <ListItem key={id} to={`/hot-zone-reports/${id}`}>
                        {name}
                    </ListItem>
                )
            })}
        </List>
    )
}
