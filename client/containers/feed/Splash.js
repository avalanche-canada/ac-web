import React from 'react'
import PropTypes from 'prop-types'
import {Splash} from '~/components/page/sections'
import {InnerHTML} from '~/components/misc'
import {Entry, EntrySet} from '~/components/feed'
import {feedSplash} from '~/containers/connectors'

// TODO: Move to components feed. Containers should not render anything!

FeedSplash.propTypes = {
    header: PropTypes.string.isRequired,
    featured: PropTypes.bool.isRequired,
    documents: PropTypes.arrayOf(PropTypes.object).isRequired,
}

function FeedSplash({
    header,
    featured,
    documents = [],
}) {
    return (
        <Splash>
            <InnerHTML>
                {header}
            </InnerHTML>
            {featured &&
                <EntrySet>
                    <Entry {...featured} />
                </EntrySet>
            }
            <EntrySet>
                {documents.map(entry => <Entry condensed key={entry.uid} {...entry} />)}
            </EntrySet>
        </Splash>
    )
}

export default feedSplash(FeedSplash)
