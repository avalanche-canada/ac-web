import React from 'react'
import Biography from 'components/biography'
import { StructuredText } from 'prismic/components/base'
import { Loading } from 'components/text'
import * as params from 'prismic/params'
import { useDocuments } from 'prismic/hooks'

export default function StaffSet({ value }) {
    const ids = value.map(({ staff }) => staff.id)
    const [documents = [], pending] = useDocuments(params.ids(ids))

    return pending ? <Loading /> : documents.map(renderItem)
}

// Utils
function renderItem({ id, data: { biography, avatar, ...props } }) {
    return (
        <Biography key={id} avatar={avatar?.url} {...props}>
            <StructuredText value={biography} />
        </Biography>
    )
}
