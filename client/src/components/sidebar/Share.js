import React, { PropTypes } from 'react'
import { Facebook, Twitter, GooglePlus } from '../icons'
import SocialItem from './SocialItem'

Share.propTypes = {
    url: PropTypes.string.isRequired
}

export default function Share({ url }) {
    return (
        <SocialItem text='Share This'>
            <a href={`www.facebook.com/share?url=${url}`}>
                <Facebook />
            </a>
            <a href={`www.twitter.com/share?url=${url}`}>
                <Twitter />
            </a>
            <a href={`www.google.com/plus/share?url=${url}`}>
                <GooglePlus />
            </a>
        </SocialItem>
    )
}
