import React from 'react'
import { Facebook, Twitter, Instagram } from '../icons'
import SocialItem from './SocialItem'

export default function Follow() {
    return (
        <SocialItem text='Follow Us'>
            <a href='http://www.facebook.com'>
                <Facebook />
            </a>
            <a href='http://www.twitter.com'>
                <Twitter />
            </a>
            <a href='http://www.instagram.com'>
                <Instagram />
            </a>
        </SocialItem>
    )
}
