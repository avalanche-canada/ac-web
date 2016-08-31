import React, {PropTypes} from 'react'
import CSSModules from 'react-css-modules'
import kebabCase from 'lodash/kebabCase'
import {SocialSet} from 'components/social'
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
    children: PropTypes.arrayOf(PropTypes.element).isRequired,
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
                    <SocialSet links={socials} fullName={fullName} />
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
