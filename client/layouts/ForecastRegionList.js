import React from 'react'
import { FormattedMessage } from 'react-intl'
import { useForecastRegionsMetadata } from 'hooks/async/features'
import * as Async from 'contexts/async'
import { List, ListItem } from 'components/page'
import { Loading } from 'components/text'
import { Layout } from 'layouts/pages'
import externals from 'router/externals'

export default function ForecastRegionList() {
    const title = (
        <FormattedMessage
            description="Layout ForecastRegionList"
            defaultMessage="Forecast regions"
        />
    )
    const headline = (
        <FormattedMessage
            description="Layout ForecastRegionList"
            defaultMessage="Click on a link below to read the avalanche forecast:"
        />
    )

    return (
        <Layout title={title} headline={headline}>
            <Async.Provider value={useForecastRegionsMetadata()}>
                <Async.Pending>
                    <Loading />
                </Async.Pending>
                <List>
                    <Async.Found>{renderRegions}</Async.Found>
                </List>
            </Async.Provider>
        </Layout>
    )
}

function renderRegions(regions) {
    return regions.map(({ id, name }) => {
        const to = externals.has(id) ? externals.get(id) : id
        const target = externals.has(id) ? id : null

        return (
            <ListItem key={id} to={to} target={target}>
                {name}
            </ListItem>
        )
    })
}
