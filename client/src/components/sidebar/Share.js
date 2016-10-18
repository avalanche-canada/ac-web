import React, {PropTypes} from 'react'
import SocialItem from './SocialItem'
import {SocialItem as Item} from 'components/social'

function createUrls(url) {
    return [
        `https://www.facebook.com/sharer.php?u=${url}`,
        `https://twitter.com/intent/tweet?url=${url}`,
        `https://plus.google.com/share?url=${url}`,
    ]
}

Share.propTypes = {
    url: PropTypes.string.isRequired,
    text: PropTypes.string,
}

export default function Share({text = 'Share this', url = document.location.href}) {
    const title = name => `Share this page on ${name}`
    const urls = createUrls(url)

    return (
        <SocialItem text={text}>
            {urls.map(url => <Item key={url} link={url} title={title} />)}
        </SocialItem>
    )
}
