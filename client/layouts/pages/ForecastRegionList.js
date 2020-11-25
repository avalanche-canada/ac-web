import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import { useForecastMetadata } from 'hooks/async/api/metadata'
import * as Async from 'contexts/async'
import { List, ListItem } from 'components/page'
import { Loading } from 'components/text'
import { Layout } from 'layouts/pages'
import { Section } from 'components/page'

export default function ForecastRegionList() {
    const title = (
        <FormattedMessage
            description="Layout ForecastRegionList"
            defaultMessage="Forecast regions"
        />
    )

    return (
        <Layout title={title} headline={<Headline />}>
            <Content />
        </Layout>
    )
}

export function Headline() {
    return (
        <FormattedMessage
            description="Layout ForecastRegionList"
            defaultMessage="Click on a link below to read the avalanche forecast:"
        />
    )
}

export function Content({ column }) {
    return (
        <Async.Provider value={useForecastMetadata()}>
            <Async.Pending>
                <Loading />
            </Async.Pending>
            <Async.Found>
                <Sections column={column} />
            </Async.Found>
        </Async.Provider>
    )
}

function Sections({ payload, column }) {
    const sections = useSections(payload)

    return Array.from(sections.entries(), ([owner, regions], index) => {
        return (
            <Section key={index} title={owner}>
                <List column={column}>
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

function useSections(forecasts) {
    return React.useMemo(() => {
        const owners = Array.from(new Set(forecasts.map(f => f.owner.display))).sort()

        return new Map(
            owners.map(owner => [
                owner,
                forecasts.filter(f => f.owner.display === owner).sort(sortForecast),
            ])
        )
    }, [forecasts])
}

function sortForecast(a, b) {
    return a.product.title.localeCompare(b.product.title)
}
