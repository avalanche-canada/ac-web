import React from 'react'
import PropTypes from 'prop-types'
import Ambassador from '~/components/ambassador'
import { StructuredText } from '~/prismic/components/base'
import { Br } from '~/components/misc'

function transform({
    avatar,
    avatarCredit,
    avatarCaption,
    banner,
    bannerCredit,
    bannerCaption,
    twitter,
    facebook,
    instagram,
    website,
    ...ambassador
}) {
    return Object.assign(ambassador, {
        avatar: {
            src: avatar.main.url,
            credit: avatarCredit,
            caption: avatarCaption,
        },
        banner: {
            src: banner.main.url,
            credit: bannerCredit,
            caption: bannerCaption,
        },
        socials: [twitter, facebook, instagram, website]
            .filter(Boolean)
            .map(social => social.value.url),
    })
}

function createAmbassador(ambassador, index, ambassadors) {
    const { biography, ...props } = transform(ambassador)

    return (
        <div key={index}>
            <Ambassador {...props}>
                <StructuredText value={biography} />
            </Ambassador>
            {index + 1 < ambassadors.length && <Br />}
        </div>
    )
}

AmbassadorSet.propTypes = {
    value: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default function AmbassadorSet({ value = [] }) {
    return (
        <div>
            {value.map(createAmbassador)}
        </div>
    )
}
