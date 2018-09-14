import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { avalancheCanadaPathRegex, href } from 'utils/url'

// TODO: Rework links props. Should be simplified.
// Links are used in StructuredText and as standalone types.
// So needs to look at both usage and change parsers accordingly

WebLink.propTypes = {
    value: PropTypes.shape({
        url: PropTypes.string.isRequired,
    }).isRequired,
    children: PropTypes.node.isRequired,
}

export default function WebLink({ children, value: { url }, ...props }) {
    if (avalancheCanadaPathRegex.test(url)) {
        if (/fxresources/.test(url)) {
            return (
                <a href={url} target="_blank" {...props}>
                    {children}
                </a>
            )
        } else {
            return (
                <Link to={href(url)} {...props}>
                    {children}
                </Link>
            )
        }
    }

    const target = url.startsWith('http') ? '_blank' : undefined

    return (
        <a href={url} target={target} {...props}>
            {children}
        </a>
    )
}
