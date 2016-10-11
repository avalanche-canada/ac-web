import React, {PropTypes} from 'react'
import CSSModules from 'react-css-modules'
import kebabCase from 'lodash/kebabCase'
import {SocialSet, SocialItem, getProvider} from 'components/social'
import {Br} from 'components/misc'
import styles from './Ambassador.css'

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
}

function Ambassador({fullName, socials = [], banner, avatar, children}) {
    return (
        <section styleName='Ambassador'>
            <div styleName='Biography'>
                <div styleName='Avatar'>
                    <img src={avatar.src} />
                    <SocialSet>
                        {socials.map((social, index) => {
                            const title = `Visit ${fullName} on ${getProvider(social)}`

                            return (
                                <SocialItem key={index} link={social} title={title} />
                            )
                        })}
                    </SocialSet>
                </div>
                <div styleName='Content'>
                    <h2>
                        <a href={`#${kebabCase(fullName)}`}>
                            {fullName}
                        </a>
                    </h2>
                    {children}
                </div>
            </div>
            <img styleName='Banner' src={banner.src} />
            <Br />
        </section>
    )
}

export default CSSModules(Ambassador, styles)
