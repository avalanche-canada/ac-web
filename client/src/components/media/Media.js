import React, {PropTypes} from 'react'
import CSSModules from 'react-css-modules'
import styles from './Media.css'
import Caption from './Caption'

Media.propTypes = {
    caption: PropTypes.node,
}

function Media({caption, children}) {
    return (
        <figure styleName='Container'>
            {children}
            {caption}
        </figure>
    )
}

export default CSSModules(Media, styles)
