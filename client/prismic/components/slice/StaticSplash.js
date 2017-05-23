import React from 'react'
import PropTypes from 'prop-types'
import { Splash } from '~/components/page/sections'
import Generic from '~/prismic/components/Generic'
import { parseGroup } from '~/prismic/parsers'
import { StructuredText } from '~/prismic/components/base'

StaticSplash.propTypes = {
    content: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default function StaticSplash(props) {
    const [{ header, post1, post2, post3 }] = parseGroup(props)
    const posts = [post1, post2, post3].filter(Boolean)

    return (
        <Splash>
            <StructuredText value={header} />
            {posts.map(post => <Generic {...post} />)}
        </Splash>
    )
}
