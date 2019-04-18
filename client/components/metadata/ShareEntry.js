import React from 'react'
import PropTypes from 'prop-types'
import Entry from './Entry'
import { Set, Item, createShareUrls } from 'components/social'

ShareEntry.propTypes = {
    term: PropTypes.string,
    url: PropTypes.string,
}

export default function ShareEntry({
    term = null,
    url = document.location.href,
}) {
    return (
        <Entry term={term}>
            <Set>
                {createShareUrls(url).map(url => (
                    <Item
                        key={url}
                        link={url}
                        title={createTitle}
                        style={ITEM_STYLE}
                    />
                ))}
            </Set>
        </Entry>
    )
}

// Utils and constants
function createTitle(provider) {
    return `Share on ${provider}`
}
const ITEM_STYLE = {
    padding: '0 0.5em',
}
