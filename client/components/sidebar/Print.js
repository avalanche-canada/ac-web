import React from 'react'
import PropTypes from 'prop-types'
import { Print as Icon } from 'components/icons'
import SocialItem from './SocialItem'

Print.propTypes = {
    url: PropTypes.string,
}

export default function Print({ url }) {
    return (
        <SocialItem>
            <a
                href={url}
                target="avcan-print-forecast"
                title="Print this forecast bulletin">
                Printable version{'\u00A0'}
                <Icon />
            </a>
        </SocialItem>
    )
}
