import React, {PropTypes} from 'react'
import CSSModules from 'react-css-modules'
import styles from './Ribbon.css'

Ribbon.propTypes = {
    children: PropTypes.string.isRequired,
    caption: PropTypes.string
}

function Ribbon({children, caption = 'From the reel'}) {
    return (
        <header styleName='Container'>
            <div styleName='Caption' title={caption}>
                {caption}
            </div>
            <div styleName='Title' title={children}>
                {children}
            </div>
        </header>
    )
}

export default CSSModules(Ribbon, styles)
