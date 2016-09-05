import React, {PropTypes} from 'react'
import {Section} from 'components/page'
import {Splash} from 'components/page/sections'
import {InnerHTML} from 'components/misc'

export default function FeedSplash({
    content: [{content, ...props}],
    label,
}) {
    return (
        <Splash {...props} >
            <InnerHTML>
                {content}
            </InnerHTML>
        </Splash>
    )
}
