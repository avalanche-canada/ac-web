import React from 'react'
import PropTypes from 'prop-types'
import Entry from './Entry'
import {SocialSet, SocialItem} from 'components/social'
import {createShareUrls} from 'components/social/utils'

function createTitle(provider) {
    return `Share on ${provider}`
}

const ITEM_STYLE = {
    padding: '0 0.5em',
}

ShareEntry.propTypes = {
    term: PropTypes.string,
    url: PropTypes.string,
}

export default function ShareEntry({term = null, url = document.location.href}) {
    return (
        <Entry term={term}>
            <SocialSet>
                {createShareUrls(url).map(url =>
                    <SocialItem
                        key={url}
                        link={url}
                        title={createTitle}
                        style={ITEM_STYLE} />
                )}
            </SocialSet>
        </Entry>
    )
}
