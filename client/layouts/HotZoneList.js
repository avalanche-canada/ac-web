import React, { Fragment } from 'react'
import { FormattedMessage } from 'react-intl'
import { useAdvisoriesMetadata } from 'hooks/async/features'
import * as Async from 'contexts/async'
import { List, ListItem } from 'components/page'
import { Loading } from 'components/text'
import { Layout } from 'layouts/pages'

export default function HotZoneList() {
    const title = (
        <FormattedMessage
            id="avalanche-advisories"
            defaultMessage="Avalanche Advisories"
        />
    )

    return (
        <Async.Provider value={useAdvisoriesMetadata()}>
            <Layout title={title} headline={<Headline />}>
                <List>
                    <Async.Found>{renderAreas}</Async.Found>
                </List>
            </Layout>
        </Async.Provider>
    )
}

function Headline() {
    return (
        <Fragment>
            <Async.Pending>
                <Loading as="span" />
            </Async.Pending>
            <Async.Found>
                {areas =>
                    areas.length === 0 ? (
                        <FormattedMessage
                            description="Layout HotZoneList"
                            defaultMessage="There is currently no Avalanche Advisories available."
                        />
                    ) : (
                        <FormattedMessage
                            description="Layout HotZoneList"
                            defaultMessage="Click on a link below to read an Avalanche Advisory."
                        />
                    )
                }
            </Async.Found>
        </Fragment>
    )
}

function renderAreas(areas) {
    return areas.map(({ id, name }) => {
        return (
            <ListItem key={id} to={`/advisories/${id}`}>
                {name}
            </ListItem>
        )
    })
}
