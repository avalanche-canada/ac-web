import React from 'react'
import PropTypes from 'prop-types'
import {Splash} from '/components/page/sections'
import {InnerHTML} from '/components/misc'
import Generic from '/prismic/components/Generic'

export default function StaticSplash({
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
