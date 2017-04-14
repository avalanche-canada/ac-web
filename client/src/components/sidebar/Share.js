import React from 'react'
import PropTypes from 'prop-types'
import SocialItem from './SocialItem'
import {SocialItem as Item} from '~/components/social'
import {createShareUrls} from '~/components/social/utils'

Share.propTypes = {
    url: PropTypes.string.isRequired,
    text: PropTypes.string,
}

export default function Share({
    label = 'Share this',
    url = document.location.href
}) {
    const title = name => `Share this page on ${name}`
    const urls = createShareUrls(url)

    return (
        <SocialItem label={label}>
            {urls.map(url =>
                <Item key={url} link={url} title={title} />
            )}
        </SocialItem>
    )
}
