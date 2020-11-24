import React from 'react'
import PropTypes from 'prop-types'
import { Link } from '@reach/router'
import Sidebar, { Header, Item } from 'components/sidebar'
import { Loading } from 'components/text'
import { feed } from 'prismic/params'
import { pathname } from 'router/prismic'
import { useDocuments } from 'prismic/hooks'
import { BLOG, NEWS, EVENT, FEED } from 'constants/prismic'
import { useIntlMemo } from 'hooks/intl'

FeedSidebar.propTypes = {
    type: PropTypes.oneOf(FEED).isRequired,
    uid: PropTypes.string.isRequired,
}

export default function FeedSidebar(props) {
    const [documents = [], pending] = useDocuments(feed.sidebar(props))
    const headers = useHeaders()

    return (
        <Sidebar share follow>
            <Header>{headers.get(props.type)}</Header>
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

function useHeaders() {
    return useIntlMemo(
        intl =>
            new Map([
                [
                    BLOG,
                    intl.formatMessage({
                        defaultMessage: 'Latest blog posts',
                        description: 'Layout feed/Sidebar',
                    }),
                ],
                [
                    NEWS,
                    intl.formatMessage({
                        defaultMessage: 'Latest news',
                        description: 'Layout feed/Sidebar',
                    }),
                ],
                [
                    EVENT,
                    intl.formatMessage({
                        defaultMessage: 'Upcoming events',
                        description: 'Layout feed/Sidebar',
                    }),
                ],
            ])
    )
}
