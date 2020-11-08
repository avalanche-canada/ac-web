import React from 'react'
import { Heading } from 'components/page'
import { Splash } from 'layouts/feed'
import { StructuredText } from 'prismic/components/base'
import Shim from 'components/Shim'
import { EVENT, BLOG, NEWS } from 'constants/prismic'

export default function FeedSplash({ value }) {
    let [{ type, tags, header, hash }] = value

    tags =
        typeof tags === 'string'
            ? tags.split(',').map(tag => tag.trim())
            : undefined

    return (
        <Splash type={TYPES.get(type)} tags={tags}>
            <Shim right>
                <Heading as="div" hash={hash}>
                    <StructuredText value={header} />
                </Heading>
            </Shim>
        </Splash>
    )
}

// Constants
const TYPES = new Map([['Events', EVENT], ['Blogs', BLOG], ['News', NEWS]])
