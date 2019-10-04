import React from 'react'
import { ItemSet, Item } from 'components/sponsor'
import { Documents } from 'prismic/containers'
import * as params from 'prismic/params'

export default function SponsorSet({ value }) {
    const ids = value.filter(isNotBroken).map(pluckId)

    return <Documents {...params.ids(ids)}>{renderChildren}</Documents>
}

// Utils
function pluckId({ sponsor }) {
    return sponsor.id
}
function renderChildren({ documents = [] }) {
    return <ItemSet>{documents.map(renderItem)}</ItemSet>
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
