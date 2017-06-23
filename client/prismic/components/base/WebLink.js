import React from 'react'
import PropTypes from 'prop-types'
import Link from 'react-router/lib/Link'
import { avalancheCanadaPathRegex, href } from '~/utils/url'
import Url from 'url'

const BLANK = '_blank'
const TARGETS = new Map([['http:', BLANK], ['https:', BLANK]])

WebLink.propTypes = {
    value: PropTypes.shape({
        url: PropTypes.string.isRequired,
    }).isRequired,
    children: PropTypes.node.isRequired,
}

export default function WebLink({ children, value: { url } }) {
    if (avalancheCanadaPathRegex.test(url)) {
        return (
            <Link to={href(url)}>
                {children}
            </Link>
        )
    }

    const { protocol } = Url.parse(url)

    return (
        <a href={url} target={TARGETS.get(protocol)}>
            {children}
        </a>
    )
}
