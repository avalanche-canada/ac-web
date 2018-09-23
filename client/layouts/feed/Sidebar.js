import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from '@reach/router'
import { Documents } from 'prismic/containers'
import { feed } from 'prismic/params'
import Sidebar, { Header, Item } from 'components/sidebar'
import { Loading } from 'components/text'
import { EVENT, NEWS, BLOG } from 'constants/prismic'
import { pathname, title } from 'utils/prismic'

const Headers = new Map([
    [BLOG, 'Latest blog posts'],
    [NEWS, 'Latest news'],
    [EVENT, 'Upcoming events'],
])

export default class FeedSidebar extends PureComponent {
    static propTypes = {
        type: PropTypes.string.isRequired,
        uid: PropTypes.string.isRequired,
    }
    renderItem(document) {
        return (
            <Item key={document.uid}>
                <Link to={pathname(document)}>{title(document)}</Link>
            </Item>
        )
    }
    children = ({ loading, documents }) => {
        if (!loading && documents?.length === 0) {
            return null
        }

        return (
            <Fragment>
                <Header>{Headers.get(this.props.type)}</Header>
                <Loading show={loading} />
                {documents && documents.map(this.renderItem)}
            </Fragment>
        )
    }
    render() {
        return (
            <Sidebar share follow>
                <Documents {...feed.sidebar(this.props)}>
                    {this.children}
                </Documents>
            </Sidebar>
        )
    }
}
