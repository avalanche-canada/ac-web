import React, {PropTypes} from 'react'
import {Facebook, Twitter, GooglePlus} from '../icons'
import SocialItem from './SocialItem'

Share.propTypes = {
    url: PropTypes.string.isRequired
}

export default function Share({url = document.location.href}) {
    return (
        <SocialItem text='Share This'>
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${url}`} target='_blank' title='Share this page on Facebook'>
                <Facebook />
            </a>
            <a href={`https://twitter.com/intent/tweet?url=${url}`} target='_blank' title='Share this page on Twitter'>
                <Twitter />
            </a>
            <a href={`https://plus.google.com/share?url=${url}`} target='_blank' title='Share this page on GooglePlus'>
                <GooglePlus />
            </a>
        </SocialItem>
    )
}
