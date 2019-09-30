import React from 'react'
import PropTypes from 'prop-types'

ImageLink.propTypes = {
    url: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
}

export default function ImageLink({ children, url, ...props }) {
    return (
        <a href={url} target="_blank" {...props}>
            {children}
        </a>
    )
}
