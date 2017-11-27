import React from 'react'
import PropTypes from 'prop-types'

Image.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string,
    openNewTab: PropTypes.bool,
}

export default function Image({ openNewTab, ...props }) {
    const image = <img {...props} />

    if (openNewTab) {
        return (
            <a href={props.src} title={props.alt} target={props.alt}>
                {image}
            </a>
        )
    } else {
        return image
    }
}
