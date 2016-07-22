import React, {PropTypes} from 'react'
import CSSModules from 'react-css-modules'
import SocialItem from './SocialItem'
import styles from './Ambassador.css'

SocialSet.propTypes = {
    links: PropTypes.arrayOf(PropTypes.string),
    fullName: PropTypes.string.isRequired,
}

function SocialSet({links, fullName}) {
    return (
        <div styleName='SocialSet'>
            {links.map(link => <SocialItem link={link} fullName={fullName} />)}
        </div>
    )
}

export default CSSModules(SocialSet, styles)
