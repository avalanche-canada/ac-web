import React from 'react'
import PropTypes from 'prop-types'
import { Email } from 'components/icons'
import { Mailto } from 'components/anchors'
import SocialItem from './SocialItem'

Contact.propTypes = {
    email: PropTypes.string,
}

export default function Contact(props) {
    return (
        <SocialItem>
            <Mailto {...props}>
                Contact us{'\u00A0'}
                <Email fill="#245EAC" />
            </Mailto>
        </SocialItem>
    )
}
