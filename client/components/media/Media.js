import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import styles from './Media.css'

Media.propTypes = {
    caption: PropTypes.node,
    children: PropTypes.node,
}

function Media({ caption, children }) {
    return (
        <figure styleName="Container">
            {children}
            {caption}
        </figure>
    )
}

export default CSSModules(Media, styles)
