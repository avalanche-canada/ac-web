import React from 'react'
import { StructuredText } from 'prismic/components/base'

export default function Block({ value }) {
    return (
        <div>
            <StructuredText value={value} />
        </div>
    )
}
