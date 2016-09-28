import React, {PropTypes} from 'react'
import {RSS} from 'components/icons'
import SocialItem from './SocialItem'

RSSFeed.propTypes = {
    url: PropTypes.string.isRequired,
}

export default function RSSFeed({url}) {
    return (
        <SocialItem text='RSS Feed'>
            <a href={url} target='_blank'>
                <RSS fill='#245EAC' />
            </a>
        </SocialItem>
    )
}
