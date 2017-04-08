import React, {DOM} from 'react'
import PropTypes from 'prop-types'
import CSSModule from 'react-css-modules'
import styles from './Image.css'

Image.propTypes = {
    openNewTab: PropTypes.bool,
}

function Image({openNewTab, ...props}) {
    const image = <img {...props} />

    if (openNewTab) {
        return (
            <a href={props.src} title={props.alt} target='_blank'>
                {image}
            </a>
        )
    } else {
        return image
    }
}

export default CSSModule(Image, styles)
