import React from 'react'
import { FormattedMessage } from 'react-intl'
import { useForecasts } from 'hooks/async/api/products'
import * as Async from 'contexts/async'
import { List, ListItem } from 'components/page'
import { Loading } from 'components/text'
import { Layout } from 'layouts/pages'

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
            <Async.Provider value={useForecasts()}>
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
    return regions.map(({ id, slug, report }) => {
        const target = slug ? null : id

        return (
            <ListItem key={id} to={slug} target={target}>
                {report.title}
            </ListItem>
        )
    })
}
