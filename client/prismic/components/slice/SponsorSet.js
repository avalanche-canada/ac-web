import React from 'react'
import { ItemSet, Item } from 'components/sponsor'
import * as params from 'prismic/params'
import { useDocuments } from 'prismic/hooks'

export default function SponsorSet({ value }) {
    const ids = value.filter(isNotBroken).map(pluckId)
    const [documents = []] = useDocuments(params.ids(ids))

    return <ItemSet>{documents.map(renderItem)}</ItemSet>
}

// Utils
function pluckId({ sponsor }) {
    return sponsor.id
}
function isNotBroken({ sponsor }) {
    return sponsor.isBroken === false
}
function renderItem({ id, data }) {
    return (
        <Item
            key={id}
            title={data.name}
            src={data['image-229']}
            url={data.url}
        />
    )
}
