import React from 'react'
import PropTypes from 'prop-types'

FileLink.propTypes = {
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
}

export default function FileLink({ children, ...props }) {
    const { name, url } = props

    return (
        <a href={url} title={name} target={name} {...props}>
            {children}
        </a>
    )
}
