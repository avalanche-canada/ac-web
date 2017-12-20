import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Muted } from 'components/text'
import { Status } from 'components/misc'
import { Splash } from 'components/page/sections'
import { Entry, EntrySet } from 'components/feed'
import { FeedSplash as Container } from 'prismic/containers'

function createEntry(document) {
    return <Entry condensed key={document.uid} {...document} />
}

export default class FeedSplash extends PureComponent {
    static propTypes = {
        type: PropTypes.string.isRequired,
        tags: PropTypes.arrayOf(PropTypes.string),
        children: PropTypes.node,
    }
    get messages() {
        return {
            isLoading: `Loading latest ${this.props.type}...`,
        }
    }
    children = ({ status, documents }) => {
        const isEmpty = status.isLoaded && documents.length === 0
        const featured = documents.find(p => p.featured) || documents[0]

        documents = documents.filter(p => p !== featured)

        // TODO: Test of delete featured.preview is required

        return [
            <Status {...status} messages={this.messages} />,
            isEmpty && <Muted>Nothing found.</Muted>,
            featured && <EntrySet>{createEntry(featured)}</EntrySet>,
            documents.length > 0 && (
                <EntrySet>{documents.map(createEntry)}</EntrySet>
            ),
        ].filter(Boolean)
    }
    render() {
        const { children, ...props } = this.props

        return (
            <Splash>
                {children}
                <Container {...props}>{this.children}</Container>
            </Splash>
        )
    }
}
