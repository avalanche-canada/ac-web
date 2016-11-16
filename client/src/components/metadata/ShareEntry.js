import React, {PropTypes} from 'react'
import {compose, setPropTypes, mapProps} from 'recompose'
import Entry from './Entry'
import {SocialSet, SocialItem} from 'components/social'
import {createShareUrls} from 'components/social/utils'

function createTitle(provider) {
    return `Share on ${provider}`
}

const STYLE = {
    flexDirection: 'row',
}
const ITEM_STYLE = {
    padding: '0 0.5em',
}

export default compose(
    setPropTypes({
        term: PropTypes.string,
        url: PropTypes.string,
    }),
    mapProps(({
        url = document.location.href,
        term = 'Share'
    }) => ({
        style: STYLE,
        term,
        children: (
            <SocialSet>
                {createShareUrls(url).map(
                    link => <SocialItem link={link} title={createTitle} style={ITEM_STYLE} />
                )}
            </SocialSet>
        )
    })),
)(Entry)
