import React from 'react'
import PropTypes from 'prop-types'
import { Splash } from '~/components/page/sections'
import { InnerHTML } from '~/components/misc'
import Generic from '~/prismic/components/Generic'

StaticSplash.propTypes = {
    content: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default function StaticSplash({
    content: [{ header, post1, post2, post3 }] = [],
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
