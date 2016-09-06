import React, {PropTypes} from 'react'
import {Link} from 'react-router'
import {Section} from 'components/page'
import {Splash} from 'components/page/sections'
import {InnerHTML} from 'components/misc'
import Generic from 'prismic/components/Generic'

export default function FeedSplash({
    content: [{header, post1, post2, post3, hash}],
    label,
}) {
    const posts = [post1, post2, post3].filter(Boolean)

    return (
        <Splash>
            <InnerHTML>
                {header}
            </InnerHTML>
            {posts.map(post => <Generic {...post} />)}
        </Splash>
    )
}
