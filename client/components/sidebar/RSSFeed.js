import React from 'react'
import PropTypes from 'prop-types'
import {RSS} from '~/components/icons'
import SocialItem from './SocialItem'

RSSFeed.propTypes = {
    url: PropTypes.string.isRequired,
}

export default function RSSFeed({url}) {
    return (
        <SocialItem>
            <a href={url} target='_blank' title='Subscribe to our RSS Feed'>
                RSS Feed{'\u00A0'}<RSS fill='#245EAC' />
            </a>
        </SocialItem>
    )
}
