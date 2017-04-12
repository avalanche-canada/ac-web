import React, {DOM} from 'react'
import {compose, mapProps} from 'recompose'
import Ambassador from '/components/ambassador'
import QuestionAnswer from '/components/question-answer'
import {InnerHTML, Br} from '/components/misc'

function computeSocials({twitter, facebook, instagram, website}) {
    return [twitter, facebook, instagram, website].filter(Boolean)
}

function renderAmbassador(props, index) {
    const {avatar, avatarCredit, avatarCaption, biography, banner, bannerCredit, bannerCaption,  fullName, ...socials} = props
    const ambassador = {
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
    }


    return (
        <Ambassador key={index} {...ambassador} >
            <InnerHTML>
                {biography}
            </InnerHTML>
        </Ambassador>
    )
}


// TODO: Expose that component
function AmbassadorSet({content = []}) {
    return (
        <div>
            {content.map(renderAmbassador)}
        </div>
    )
}

export default AmbassadorSet
