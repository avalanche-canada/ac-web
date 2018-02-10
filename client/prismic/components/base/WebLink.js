import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { avalancheCanadaPathRegex, href } from 'utils/url'
import Url from 'url'

const BLANK = '_blank'
const TARGETS = new Map([['http:', BLANK], ['https:', BLANK]])

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
        return (
            <Link to={href(url)} {...props}>
                {children}
            </Link>
        )
    }

    const { protocol } = Url.parse(url)

    return (
        <a href={url} target={TARGETS.get(protocol)} {...props}>
            {children}
        </a>
    )
}
