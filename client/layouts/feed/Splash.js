import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Muted, Loading } from 'components/text'
import { Splash } from 'components/page/sections'
import { Entry, EntrySet } from 'components/feed'
import { Documents } from 'prismic/containers'
import { feed } from 'prismic/params'

FeedSplash.propTypes = {
    type: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string),
    children: PropTypes.node,
}

export default function FeedSplash({ children, ...props }) {
    const { type } = props

    return (
        <Splash>
            {children}
            <Documents {...feed.splash(props)}>
                {({ loading, documents = [] }) => {
                    const isEmpty = !loading && documents.length === 0
                    const featured =
                        documents.find(p => p.featured) || documents[0]

                    documents = documents.filter(p => p !== featured)

                    return (
                        <Fragment>
                            <Loading show={loading}>
                                {`Loading latest ${type}...`}
                            </Loading>
                            {isEmpty && <Muted>Nothing found.</Muted>}
                            {featured && (
                                <EntrySet>{createEntry(featured)}</EntrySet>
                            )}
                            {documents.length > 0 && (
                                <EntrySet>
                                    {documents.map(createEntry)}
                                </EntrySet>
                            )}
                        </Fragment>
                    )
                }}
            </Documents>
        </Splash>
    )
}

// Utils
function createEntry(document) {
    return <Entry condensed key={document.uid} {...document} />
}
