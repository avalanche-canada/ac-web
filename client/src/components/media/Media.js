import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import styles from './Media.css'

Media.propTypes = {
    caption: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
}

function Media({ caption, children }) {
    return (
        <figure styleName='Container'>
            {children}
            {caption &&
                <figcaption styleName='Caption'>
                    {caption}
                </figcaption>
            }
        </figure>
    )
}

export default CSSModules(Media, styles)
