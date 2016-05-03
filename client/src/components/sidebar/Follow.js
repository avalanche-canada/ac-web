import React from 'react'
import { Facebook, Twitter, Instagram } from '../icons'
import SocialItem from './SocialItem'

export default function Follow() {
    return (
        <SocialItem text='Follow Us'>
            <a href='https://www.facebook.com/avalanchecanada'>
                <Facebook />
            </a>
            <a href='https://twitter.com/avalancheca'>
                <Twitter />
            </a>
            <a href='http://instagram.com/avalanchecanada'>
                <Instagram />
            </a>
        </SocialItem>
    )
}
