import React, { PropTypes } from 'react'

const isExternalRegExp = new RegExp('^http(s):\/\/')
function isExternal(to) {
    if (typeof to !== 'string') {
        return false
    }

    return isExternalRegExp.test(to)
}

Link.propTypes = {
    to: PropTypes.string.isRequired
}

export default function Link({ to = '#', children, ...props }) {
    const target = isExternal(to) ? '_blank' : null

    return (
        <a href={to} target={target} {...props} >
            {children}
        </a>
    )
}
