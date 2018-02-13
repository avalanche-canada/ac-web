import React from 'react'
import PropTypes from 'prop-types'

FileLink.propTypes = {
    value: PropTypes.shape({
        file: PropTypes.shape({
            name: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
    children: PropTypes.node.isRequired,
}

export default function FileLink({ children, value, ...props }) {
    const { name, url } = value.file

    return (
        <a href={url} title={name} target={name} {...props}>
            {children}
        </a>
    )
}
