import React from 'react'
import PropTypes from 'prop-types'
import { Splash } from 'components/page/sections'
import { Generic } from 'prismic/components'
import { StructuredText } from 'prismic/components/base'

StaticSplash.propTypes = {
    value: PropTypes.arrayOf(
        PropTypes.shape({
            content: PropTypes.arrayOf(PropTypes.object).isRequired,
        })
    ).isRequired,
}

export default function StaticSplash({ value }) {
    const [{ header, post1, post2, post3 }] = value
    const posts = [post1, post2, post3].filter(Boolean)

    return (
        <Splash>
            <StructuredText value={header} />
            {posts.map(post => <Generic {...post} />)}
        </Splash>
    )
}
