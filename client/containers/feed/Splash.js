import React from 'react'
import PropTypes from 'prop-types'
import { Splash } from '~/components/page/sections'
import { Entry, EntrySet } from '~/components/feed'
import { feedSplash } from '~/containers/connectors'
import { parse } from '~/prismic'

// TODO: Move to components feed. Containers should not render anything!

function createEntry(document) {
    // TODO: Should be the same as all other parser
    const data = parse(document)

    return <Entry condensed key={document.uid} {...data} />
}

FeedSplash.propTypes = {
    header: PropTypes.string.isRequired,
    featured: PropTypes.bool.isRequired,
    documents: PropTypes.arrayOf(PropTypes.object).isRequired,
}

function FeedSplash({ header, featured, documents = [] }) {
    return (
        <Splash>
            {header}
            {featured &&
                <EntrySet>
                    {createEntry(featured)}
                </EntrySet>}
            <EntrySet>
                {documents.map(createEntry)}
            </EntrySet>
        </Splash>
    )
}

export default feedSplash(FeedSplash)
