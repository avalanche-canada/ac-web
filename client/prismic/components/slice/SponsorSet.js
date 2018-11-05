import React from 'react'
import { ItemSet, Item } from 'components/sponsor'
import parse from '../../parsers'

export default function SponsorSet({ value }) {
    return <ItemSet>{value.filter(isNotBroken).map(renderItem)}</ItemSet>
}

// Utils
function isNotBroken({ sponsor }) {
    return !sponsor.value.isBroken
}
function renderItem(slice) {
    const {
        id,
        data: { image229, name, url },
    } = parse(slice.sponsor.value.document)

    return <Item key={id} title={name} src={image229} url={url} />
}
