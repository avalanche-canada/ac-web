import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import { compose, withProps } from 'recompose'
import { withHash } from '~/compose'
import kebabCase from 'lodash/kebabCase'
import { SocialSet, SocialItem } from '~/components/social'
import { Br } from '~/components/misc'
import styles from './Ambassador.css'

// TODO: Remove Br from here and create an AmbassadorSet component

const ImagePropType = PropTypes.shape({
    src: PropTypes.string.isRequired,
    credit: PropTypes.string,
    caption: PropTypes.string,
})

Ambassador.propTypes = {
    fullName: PropTypes.string.isRequired,
    socials: PropTypes.arrayOf(PropTypes.string),
    children: PropTypes.node.isRequired,
    avatar: ImagePropType,
    banner: ImagePropType,
    hash: PropTypes.string,
}

function Ambassador({
    fullName,
    socials = [],
    banner,
    avatar,
    children,
    hash,
}) {
    const title = name => `Visit ${fullName} on ${name}`

    return (
        <section styleName="Ambassador">
            <div styleName="Biography">
                <div styleName="Avatar">
                    <img src={avatar.src} />
                    <SocialSet>
                        {socials.map(link => (
                            <SocialItem key={link} link={link} title={title} />
                        ))}
                    </SocialSet>
                </div>
                <div styleName="Content">
                    <h2>
                        <a href={`#${hash}`}>
                            {fullName}
                        </a>
                    </h2>
                    {children}
                </div>
            </div>
            <img styleName="Banner" src={banner.src} />
            <Br />
        </section>
    )
}

export default compose(
    withProps(({ fullName }) => ({
        hash: kebabCase(fullName),
    })),
    withHash,
    CSSModules(styles)
)(Ambassador)
