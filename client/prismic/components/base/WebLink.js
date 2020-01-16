import React from 'react'
import PropTypes from 'prop-types'
import { Link } from '@reach/router'
import { isAvalancheCanada, isExternal, forceHttps, href } from 'utils/url'

// TODO: Rework links props. Should be simplified.
// Links are used in StructuredText and as standalone types.
// So needs to look at both usage and change parsers accordingly

WebLink.propTypes = {
    url: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
}

export default function WebLink({ children, url, ...props }) {
    if (isAvalancheCanada(url)) {
        if (FXResourcesRegex.test(url)) {
            return (
                <a {...props} href={forceHttps(url)} target="fxresources">
                    {children}
                </a>
            )
        } else if (CherryBowlRegex.test(url)) {
            return (
                <a {...props} href={forceHttps(url)} target="cherry-bowl">
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

    const target = isExternal(url) ? '_blank' : undefined

    return (
        <a href={url} target={target} {...props}>
            {children}
        </a>
    )
}

// Constants
const FXResourcesRegex = /fxresources/
const CherryBowlRegex = /(cherry-bowl|cherrybowl)/
