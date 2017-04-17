import React from 'react'
import PropTypes from 'prop-types'
import Base from '~/components/ambassador'
import {InnerHTML} from '~/components/misc'

function computeSocials({twitter, facebook, instagram, website}) {
    return [twitter, facebook, instagram, website].filter(Boolean)
}

Ambassador.propTypes = {
    fullName: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    avatarCredit: PropTypes.string,
    avatarCaption: PropTypes.string,
    biography: PropTypes.string.isRequired,
    banner: PropTypes.string.isRequired,
    bannerCredit: PropTypes.string,
    bannerCaption: PropTypes.string,
}

function Ambassador({
    avatar,
    avatarCredit,
    avatarCaption,
    biography,
    banner,
    bannerCredit,
    bannerCaption,
    fullName,
    // FIXME: Risky!
    ...socials
}) {
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
        <Base {...ambassador} >
            <InnerHTML>
                {biography}
            </InnerHTML>
        </Base>
    )
}

AmbassadorSet.propTypes = {
    content: PropTypes.arrayOf(PropTypes.object),
}

export default function AmbassadorSet({content = []}) {
    return (
        <div>
            {content.map((ambassador, index) => (
                <Ambassador key={index} {...ambassador} />
            ))}
        </div>
    )
}
