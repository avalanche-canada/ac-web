import React from 'react'
import { Email } from '../icons'
import { Mailto } from '../misc'
import SocialItem from './SocialItem'

export default function Contact() {
    return (
        <SocialItem text='Contact Us'>
            <Mailto>
                <Email width={28} height={28} fill={'#0056B7'} />
            </Mailto>
        </SocialItem>
    )
}
