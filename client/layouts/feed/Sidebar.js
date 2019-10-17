import React from 'react'
import PropTypes from 'prop-types'
import { Link } from '@reach/router'
import Sidebar, { Header, Item } from 'components/sidebar'
import { Loading } from 'components/text'
import { feed } from 'prismic/params'
import { pathname } from 'router/prismic'
import { useDocuments } from 'prismic/hooks'
import { EVENT, NEWS, BLOG, FEED } from 'constants/prismic'

FeedSidebar.propTypes = {
    type: PropTypes.oneOf(FEED).isRequired,
    uid: PropTypes.string.isRequired,
}

export default function FeedSidebar(props) {
    const [documents = [], pending] = useDocuments(feed.sidebar(props))

    return (
        <Sidebar share follow>
            <Header>{Headers.get(props.type)}</Header>
            {pending && <Loading />}
            {documents.map(renderItem)}
        </Sidebar>
    )
}

// Constants & utils
function renderItem(document) {
    return (
        <Item key={document.uid}>
            <Link to={pathname(document)}>{document.data.title}</Link>
        </Item>
    )
}
const Headers = new Map([
    [BLOG, 'Latest blog posts'],
    [NEWS, 'Latest news'],
    [EVENT, 'Upcoming events'],
])
