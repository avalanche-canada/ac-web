import React from 'react'
import {Email} from '../icons'
import {Mailto} from '../misc'
import SocialItem from './SocialItem'

export default function Contact() {
    return (
        <SocialItem text='Contact Us'>
            <Mailto>
                <Email fill='#245EAC' />
            </Mailto>
        </SocialItem>
    )
}
