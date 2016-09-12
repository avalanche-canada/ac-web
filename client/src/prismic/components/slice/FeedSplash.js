import React, {PropTypes} from 'react'
import {compose, mapProps, lifecycle, withState} from 'recompose'
import {connect} from 'react-redux'
import {Splash} from 'components/page/sections'
import {InnerHTML} from 'components/misc'
import {loadForType} from 'actions/prismic'
import {Predicates} from 'prismic'
import {Entry} from 'components/page/feed'

function FeedSplash({
    header,
    featured,
    list = [],
}) {
    return (
        <Splash>
            <InnerHTML>
                {header}
            </InnerHTML>
            {featured && <Entry {...featured} />}
            {list.map(entry => <Entry {...entry} />)}
        </Splash>
    )
}

const types = new Map([
    ['Events', 'event'],
    ['Blogs', 'blog'],
    ['News', 'news'],
])

export default compose(
    connect(null, {
        loadForType
    }),
    withState('featured', 'setFeatured', null),
    withState('feed', 'setFeed', []),
    lifecycle({
        componentDidMount() {
            const {
                content: [splash],
                loadForType,
                setFeatured,
                setFeed,
            } = this.props
            const type = types.get(splash.type)
            loadForType(type, {
                pageSize: 5,
                orderings: [
                    `my.${type}.date desc`,
                ],
            }).then(({results}) => {
                setFeed(results)
                setFeatured(results[0])
                // setFeed(results)
            })
        }
    }),
)(FeedSplash)
