import React from 'react'
import { Section as Base } from 'components/page'
import { StructuredText } from 'prismic/components/base'

export default function Section({ value }) {
    const [{ content, ...props }] = value

    return (
        <Base {...props}>
            <StructuredText value={content} />
        </Base>
    )
}
