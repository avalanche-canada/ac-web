import React, {PropTypes} from 'react'
import CSSModules from 'react-css-modules'
import kebabCase from 'lodash/kebabCase'
import {SocialSet, SocialItem, getProvider} from 'components/social'
import {Br} from 'components/misc'
import styles from './Ambassador.css'

const ImagePropType = PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
    url: PropTypes.string,
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
            <img styleName='Banner' {...banner} />
            <Br />
            <div styleName='Biography'>
                <div>
                    <img styleName='Avatar' {...avatar} />
                    <SocialSet>
                        {socials.map(social => {
                            const title = `Visit ${fullName} on ${getProvider(social)}`

                            return (
                                <SocialItem link={social} title={title} />
                            )
                        })}
                    </SocialSet>
                </div>
                <div>
                    <a href={`#${kebabCase(fullName)}`}>
                        <h2>{fullName}</h2>
                    </a>
                    {children}
                </div>
            </div>
        </section>
    )
}

export default CSSModules(Ambassador, styles)
