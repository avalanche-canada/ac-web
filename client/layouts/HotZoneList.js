import React from 'react'
import { useAdvisoriesMetadata } from 'hooks/async/features'
import { List, ListItem } from 'components/page'
import { Loading } from 'components/text'
import { Layout } from 'layouts/pages'

export default function HotZoneList() {
    const [areas, pending] = useAdvisoriesMetadata()

    return (
        <Layout
            title="Avalanche Advisories"
            headline={
                areas.length > 0 ? (
                    'Click on a link below to read an Avalanche Advisory.'
                ) : pending ? (
                    <Loading />
                ) : (
                    'There is currently no Avalanche Advisory available.'
                )
            }>
            <List>
                {areas.map(({ id, name }) => {
                    return (
                        <ListItem key={id} to={`/advisories/${id}`}>
                            {name}
                        </ListItem>
                    )
                })}
            </List>
        </Layout>
    )
}
