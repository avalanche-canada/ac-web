import React, {PropTypes} from 'react'
import {Print as Icon} from 'components/icons'
import SocialItem from './SocialItem'

Print.propTypes = {
    url: PropTypes.string,
}

export default function Print({url}) {
    return (
        <SocialItem>
            <a href={url} target='_blank' title='Print this forecast bulletin'>
                Printable version{'\u00A0'}<Icon fill='#245EAC' />
            </a>
        </SocialItem>
    )
}
