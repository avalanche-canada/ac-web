import React from 'react'
import PropTypes from 'prop-types'

ImageLink.propTypes = {
    value: PropTypes.shape({
        image: PropTypes.shape({
            url: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
    children: PropTypes.node.isRequired,
}

export default function ImageLink({
    children,
    value: { image: { url } },
    ...props
}) {
    return (
        <a href={url} target="_blank" {...props}>
            {children}
        </a>
    )
}
