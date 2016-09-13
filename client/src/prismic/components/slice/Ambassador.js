import React from 'react'
import {compose, flattenProp, mapProps, renameProp} from 'recompose'
import Ambassador from 'components/ambassador'
import QuestionAnswer from 'components/question-answer'
import {InnerHTML} from 'components/misc'

function computeSocials({twitter, facebook, instagram, website}) {
    return [twitter, facebook, instagram, website].filter(Boolean)
}

export default compose(
    mapProps(props => {
        const {avatar, avatarCredit, avatarCaption, biography, banner, bannerCredit, bannerCaption,  fullName, ...socials} = props.content[0]

        return {
            fullName,
            avatar: {
                src: avatar.url,
                credit: avatarCredit,
                caption: avatarCaption,
            },
            banner: {
                src: banner.url,
                credit: bannerCredit,
                caption: bannerCaption,
            },
            socials: computeSocials(socials),
            children: (
                <InnerHTML>
                    {biography}
                </InnerHTML>
            )
        }
    }),
)(Ambassador)
