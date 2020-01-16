import React from 'react'
import { Heading } from 'components/page'
import { Splash } from 'layouts/feed'
import { StructuredText } from 'prismic/components/base'
import Shim from 'components/Shim'

export default function FeedSplash({ value }) {
    let [{ type, tags, header, hash }] = value

    header = <StructuredText value={header} />

    tags =
        typeof tags === 'string'
            ? tags.split(',').map(tag => tag.trim())
            : undefined

    return (
        <Splash type={TYPES.get(type)} tags={tags}>
            <Shim right>
                <Heading as="div" hash={hash}>
                    {header}
                </Heading>
            </Shim>
        </Splash>
    )
}

// Constants
const TYPES = new Map([
    ['Events', 'event'],
    ['Blogs', 'blog'],
    ['News', 'news'],
])
