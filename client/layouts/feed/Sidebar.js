import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from '@reach/router'
import { Documents } from 'prismic/containers'
import { feed } from 'prismic/params'
import Sidebar, { Header, Item } from 'components/sidebar'
import { Loading } from 'components/text'
import { EVENT, NEWS, BLOG } from 'constants/prismic'
import { pathname, title } from 'utils/prismic'

FeedSidebar.propTypes = {
    type: PropTypes.string.isRequired,
    uid: PropTypes.string.isRequired,
}

export default function FeedSidebar(props) {
    return (
        <Sidebar share follow>
            <Documents {...feed.sidebar(props)}>
                {({ loading, documents }) => {
                    if (!loading && documents?.length === 0) {
                        return null
                    }

                    return (
                        <Fragment>
                            <Header>{Headers.get(props.type)}</Header>
                            <Loading show={loading} />
                            {documents && documents.map(renderItem)}
                        </Fragment>
                    )
                }}
            </Documents>
        </Sidebar>
    )
}

// Constants & utils
function renderItem(document) {
    return (
        <Item key={document.uid}>
            <Link to={pathname(document)}>{title(document)}</Link>
        </Item>
    )
}
const Headers = new Map([
    [BLOG, 'Latest blog posts'],
    [NEWS, 'Latest news'],
    [EVENT, 'Upcoming events'],
])
