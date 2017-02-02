import React, {PropTypes} from 'react'
import {compose, withProps, defaultProps} from 'recompose'
import {feedSidebar} from 'containers/connectors'
import Sidebar, {Header, Item} from 'components/sidebar'
import Link from 'prismic/components/Link'
import {EVENT, NEWS, BLOG} from 'selectors/prismic/feed'

const Headers = new Map([
    [BLOG, 'Latest'],
    [NEWS, 'Latest'],
    [EVENT, 'Upcoming events'],
])

export default compose(
    defaultProps({
        share: true,
        follow: true,
    }),
    feedSidebar,
    withProps(({documents, type}) => ({
        children: [
            <Header>{Headers.get(type)}</Header>,
            ...documents.map(document => (
                <Item key={document.uid}>
                    <Link document={document} />
                </Item>
            ))
        ]
    }))
)(Sidebar)
