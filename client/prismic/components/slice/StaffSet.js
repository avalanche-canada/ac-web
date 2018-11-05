import React, { memo, Fragment } from 'react'
import Biography from 'components/biography'
import { StructuredText } from 'prismic/components/base'
import { Documents } from 'prismic/containers'
import { Loading } from 'components/text'
import * as params from 'prismic/params'

function StaffSet({ value }) {
    const ids = value.map(pluckId)

    return <Documents {...params.ids(ids)}>{renderChildren}</Documents>
}

export default memo(StaffSet)

// Utils
function pluckId({ staff }) {
    return staff.value.document.id
}
function renderChildren({ loading, documents = [] }) {
    return (
        <Fragment>
            <Loading show={loading} />
            {documents.map(renderItem)}
        </Fragment>
    )
}

function renderItem({ id, data: { biography, avatar, ...props } }) {
    return (
        <Biography key={id} avatar={avatar?.main?.url} {...props}>
            <StructuredText value={biography} />
        </Biography>
    )
}
