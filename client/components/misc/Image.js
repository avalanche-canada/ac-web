import React from 'react'

export function OpenInNewTab({ children }) {
    const { src, alt = src, title = alt } = children.props

    return (
        <a href={src} title={title} target={alt}>
            {children}
        </a>
    )
}
