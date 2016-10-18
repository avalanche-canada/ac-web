import React, {PropTypes} from 'react'
import {Email} from '../icons'
import {Mailto} from '../misc'
import SocialItem from './SocialItem'

Contact.propTypes = {
    email: PropTypes.string,
}

export default function Contact(props) {
    return (
        <SocialItem text='Contact us'>
            <Mailto {...props}>
                <Email fill='#245EAC' />
            </Mailto>
        </SocialItem>
    )
}
