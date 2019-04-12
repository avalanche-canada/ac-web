import React from 'react'
import PropTypes from 'prop-types'

Image.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string,
}

export default function Image(props) {
    // FIXME Well this component does not do much!!!
    return <img {...props} />
}

export function OpenInNewTab({ children }) {
    const { src, alt = src, title = alt } = children.props

    return (
        <a href={src} title={title} target={alt}>
            {children}
        </a>
    )
}
