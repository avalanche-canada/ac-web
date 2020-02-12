import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { navigate } from '@reach/router'
import { isAvalancheCanada, href } from 'utils/url'

InnerHTML.propTypes = {
    children: PropTypes.string,
}

function InnerHTML({ children, ...props }) {
    if (!children) {
        return null
    }

    return (
        <div
            onClick={handleClick}
            {...props}
            dangerouslySetInnerHTML={{ __html: children }}
        />
    )
}

export default memo(InnerHTML)

function handleClick({ target, metaKey }) {
    if (
        target.tagName === 'A' &&
        metaKey === false &&
        isAvalancheCanada(target.href)
    ) {
        event.preventDefault()
        navigate(href(target.href))
    }
}
