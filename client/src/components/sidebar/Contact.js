import React from 'react'
import PropTypes from 'prop-types'
import {Email} from '../icons'
import {Mailto} from '../misc'
import SocialItem from './SocialItem'

Contact.propTypes = {
    email: PropTypes.string,
}

function Contact(props) {
    return (
        <SocialItem>
            <Mailto {...props}>
                Contact us{'\u00A0'}<Email fill='#245EAC' />
            </Mailto>
        </SocialItem>
    )
}

export default Contact
