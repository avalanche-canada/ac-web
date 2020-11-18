import React, { useMemo } from 'react'
import { FormattedMessage } from 'react-intl'
import { useMetadata } from 'hooks/async/api/metadata'
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

    return sections.map(({ header, regions }, index) => {
        return (
            <List key={index}>
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
        )
    })
}

function useSections(regions) {
    return useMemo(() => {
        return [{ regions }]
    }, [regions])
}
