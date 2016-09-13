import React from 'react'
import {Facebook, Twitter, Instagram} from '../icons'
import SocialItem from './SocialItem'

export default function Follow() {
    return (
        <SocialItem text='Follow Us'>
            <a href='https://www.facebook.com/avalanchecanada' title='Follow us on Facebook'>
                <Facebook />
            </a>
            <a href='https://twitter.com/avalancheca' title='Follow us on Twitter'>
                <Twitter />
            </a>
            <a href='http://instagram.com/avalanchecanada' title='Follow us on Instagram'>
                <Instagram />
            </a>
        </SocialItem>
    )
}
