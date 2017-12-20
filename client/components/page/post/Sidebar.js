import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { FeedSidebar as Container } from 'prismic/containers'
import Sidebar, { Header, Item } from 'components/sidebar'
import { Status } from 'components/misc'
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
    children = ({ status, documents }) => {
        if (status.isLoaded && documents.length === 0) {
            return null
        }

        return [
            <Header>{Headers.get(this.props.type)}</Header>,
            <Status {...status} />,
            ...documents.map(this.renderItem),
        ]
    }
    render() {
        return (
            <Sidebar share follow>
                <Container {...this.props}>{this.children}</Container>
            </Sidebar>
        )
    }
}
