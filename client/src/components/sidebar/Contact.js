import React from 'react'
import { Email } from '../icons'
import SocialItem from './SocialItem'

export default function Contact() {
    return (
        <SocialItem text='Contact Us'>
            <a href='mailto:info@avalanche.ca'>
                <Email width={28} height={28} fill={'#0056B7'} />
            </a>
        </SocialItem>
    )
}
