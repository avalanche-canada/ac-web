import React from 'react'
import { withProps } from 'recompose'
import FeedSplash from '~/containers/feed/Splash'
import { parseGroup } from '~/prismic/parsers'
import { StructuredText } from '~/prismic/components/base'

const types = new Map([
    ['Events', 'event'],
    ['Blogs', 'blog'],
    ['News', 'news'],
])

export default withProps(props => {
    const [{ type, header, tags }] = parseGroup(props)

    return {
        type: types.get(type),
        tags: typeof tags === 'string'
            ? tags.split(',').map(tag => tag.trim())
            : [],
        header: <StructuredText value={header} />,
    }
})(FeedSplash)
