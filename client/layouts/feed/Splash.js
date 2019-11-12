import React from 'react'
import PropTypes from 'prop-types'
import { Muted, Loading } from 'components/text'
import { Splash } from 'components/page/sections'
import Entry from './Entry'
import EntrySet from './EntrySet'
import { feed } from 'prismic/params'
import { useDocuments } from 'prismic/hooks'

// TODO Move this to prismic/feed or something like that

FeedSplash.propTypes = {
    type: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string),
    children: PropTypes.node,
}

export default function FeedSplash({ children, ...props }) {
    const { type } = props
    const [documents = [], pending] = useDocuments(feed.splash(props))
    const isEmpty = !pending && documents.length === 0
    const featured = documents.find(isFeatured) || documents[0]
    const others = documents.filter(p => p !== featured)

    return (
        <Splash>
            {children}
            {pending && <Loading>{`Loading latest ${type}...`}</Loading>}
            {isEmpty && <Muted>Nothing found.</Muted>}
            {featured && <EntrySet>{createEntry(featured)}</EntrySet>}
            {others.length > 0 && (
                <EntrySet>{others.map(createEntry)}</EntrySet>
            )}
        </Splash>
    )
}

// Utils
function createEntry(document) {
    return <Entry condensed key={document.uid} {...document} />
}
function isFeatured({ tags }) {
    return tags.includes('featured')
}
