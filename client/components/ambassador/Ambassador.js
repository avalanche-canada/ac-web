import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import { compose, withProps } from 'recompose'
import { withHash } from 'compose'
import kebabCase from 'lodash/kebabCase'
import { Image } from 'prismic/components/base'
import { SocialSet, SocialItem } from 'components/social'
import styles from './Ambassador.css'

Ambassador.propTypes = {
    fullName: PropTypes.string.isRequired,
    socials: PropTypes.arrayOf(PropTypes.string),
    children: PropTypes.node.isRequired,
    avatar: PropTypes.object.isRequired,
    banner: PropTypes.object.isRequired,
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
                    {avatar && <Image {...avatar.main} />}
                    <SocialSet>
                        {socials.map(link => (
                            <SocialItem key={link} link={link} title={title} />
                        ))}
                    </SocialSet>
                </div>
                <div styleName="Content">
                    <h2>
                        <a href={`#${hash}`}>{fullName}</a>
                    </h2>
                    {children}
                </div>
            </div>
            {banner && <Image styleName="Banner" {...banner.main} />}
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
