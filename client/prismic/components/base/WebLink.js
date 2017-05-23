import React from 'react'
import PropTypes from 'prop-types'
import Link from 'react-router/lib/Link'
import { avalancheCanadaPathRegex, href } from '~/utils/url'

WebLink.propTypes = {
    value: PropTypes.shape({
        url: PropTypes.string.isRequired,
    }).isRequired,
    children: PropTypes.node.isRequired,
}

export default function WebLink({ children, value }) {
    const { url } = value

    if (avalancheCanadaPathRegex.test(url)) {
        return (
            <Link to={href(url)}>
                {children}
            </Link>
        )
    }

    return (
        <a href={url} target="_blank">
            {children}
        </a>
    )
}
