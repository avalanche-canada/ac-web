import React from 'react'
import { HotZones } from 'containers/features'
import { List, ListItem } from 'components/page'
import { Loading } from 'components/text'
import Page from 'layouts/Page'

export default function HotZoneList() {
    return (
        <Page
            title="Avalanche Advisories"
            headline="Click on a link below to read an Avalanche Advisory.">
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
                    <ListItem key={id} to={`/advisories/${id}`}>
                        {name}
                    </ListItem>
                )
            })}
        </List>
    )
}
