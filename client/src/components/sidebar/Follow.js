import React from 'react'
import {Facebook, Twitter, Instagram} from '../icons'
import SocialItem from './SocialItem'

export default function Follow() {
    return (
        <SocialItem text='Follow Us'>
            <a href='https://www.facebook.com/avalanchecanada' target='_blank' title='Follow us on Facebook'>
                <Facebook />
            </a>
            <a href='https://twitter.com/avalancheca' target='_blank' title='Follow us on Twitter'>
                <Twitter />
            </a>
            <a href='http://instagram.com/avalanchecanada' target='_blank' title='Follow us on Instagram'>
                <Instagram />
            </a>
        </SocialItem>
    )
}
