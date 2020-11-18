import React, { useMemo } from 'react'
import { FormattedMessage } from 'react-intl'
import { useMetadata } from 'hooks/async/api/metadata'
import * as Async from 'contexts/async'
import { List, ListItem } from 'components/page'
import { Loading } from 'components/text'
import { Layout } from 'layouts/pages'
import { FORECAST } from 'constants/products'
import { Section } from 'components/page'

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
            <Async.Provider value={useMetadata()}>
                <Async.Pending>
                    <Loading />
                </Async.Pending>
                <Async.Found>
                    <Regions />
                </Async.Found>
            </Async.Provider>
        </Layout>
    )
}

function Regions({ payload }) {
    const sections = useSections(payload)

    return Array.from(sections.entries(), ([owner, regions], index) => {
        return (
            <Section key={index} title={owner}>
                <List>
                    {regions.map(({ product, url, owner }) => {
                        const { slug, id, title } = product
                        const target = owner.isExternal ? slug : null
                        const to = owner.isExternal ? url : slug

                        return (
                            <ListItem key={id} to={to} target={target}>
                                {title}
                            </ListItem>
                        )
                    })}
                </List>
            </Section>
        )
    })
}

function useSections(metadata) {
    return useMemo(() => {
        const forecasts = metadata.filter(m => m.product.type === FORECAST)
        const owners = new Set(forecasts.map(f => f.owner.display).sort())
        const sections = new Map(Array.from(owners, owner => [owner, null]))

        for (const [owner] of sections) {
            sections.set(
                owner,
                forecasts
                    .filter(f => f.owner.display === owner)
                    .sort(sortForecast)
            )
        }

        return sections
    }, [metadata])
}

function sortForecast(a, b) {
    return a.product.title.localeCompare(b.product.title)
}
