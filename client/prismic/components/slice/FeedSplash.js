import React from 'react'
import Base from 'containers/feed/Splash'
import { StructuredText } from 'prismic/components/base'

const types = new Map([
    ['Events', 'event'],
    ['Blogs', 'blog'],
    ['News', 'news'],
])

export default function FeedSplash({ value }) {
    const [{ type, header, tags }] = value

    return (
        <Base
            type={types.get(type)}
            tags={
                typeof tags === 'string'
                    ? tags.split(',').map(tag => tag.trim())
                    : []
            }
            header={<StructuredText value={header} />}
        />
    )
}
