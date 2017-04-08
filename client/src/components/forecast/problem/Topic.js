import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import styles from './Problem.css'

Topic.propTypes = {
    src: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
}

function Topic({title, src}) {
    return (
        <figure styleName='Topic'>
            <div styleName='Topic--Content'>
                <img src={src} />
            </div>
            <figcaption>{title}</figcaption>
        </figure>
    )
}

export default CSSModules(Topic, styles)
