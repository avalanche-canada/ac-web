import React, {PropTypes} from 'react'
import CSSModules from 'react-css-modules'
import styles from './Ambassador.css'
import SocialSet from './SocialSet'
import kebabCase from 'lodash/kebabCase'

Ambassador.propTypes = {
    fullName: PropTypes.string.isRequired,
    socials: PropTypes.arrayOf(PropTypes.string),
    children: PropTypes.arrayOf(PropTypes.element).isRequired,
}

function Ambassador({fullName, socials = [], children}) {
    return (
        <section styleName='Ambassador'>
            <div>

                <SocialSet links={socials} fullName={fullName} />
            </div>
            <div>
                <a href={`#${kebabCase(fullName)}`}>
                    <h2>{fullName}</h2>
                </a>
                {children}
            </div>
        </section>
    )
}

export default CSSModules(Ambassador, styles)
