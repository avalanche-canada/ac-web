import React, {PropTypes} from 'react'
import {Email} from '../icons'
import {Mailto} from '../misc'
import SocialItem from './SocialItem'

Contact.propTypes = {
    email: PropTypes.string,
}

export default function Contact({email}) {
    return (
        <SocialItem text='Contact Us'>
            <Mailto email={email}>
                <Email fill='#245EAC' />
            </Mailto>
        </SocialItem>
    )
}
