import React, { memo } from 'react'
import { Splash } from 'layouts/feed'
import { StructuredText } from 'prismic/components/base'
import { FragmentIdentifier } from 'router'
import Shim from 'components/Shim'

function FeedSplash({ value }) {
    let [{ type, tags, header, hash }] = value

    header = <StructuredText value={header} />

    tags =
        typeof tags === 'string'
            ? tags.split(',').map(tag => tag.trim())
            : undefined

    return (
        <Splash type={TYPES.get(type)} tags={tags}>
            <Shim right>
                {hash ? (
                    <FragmentIdentifier hash={hash}>
                        {header}
                    </FragmentIdentifier>
                ) : (
                    { header }
                )}
            </Shim>
        </Splash>
    )
}

export default memo(FeedSplash)

// Constants
const TYPES = new Map([
    ['Events', 'event'],
    ['Blogs', 'blog'],
    ['News', 'news'],
])
