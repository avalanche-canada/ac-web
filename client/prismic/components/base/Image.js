import React, { Children, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'
import { Credit } from 'components/markup'
import WebLink from './WebLink'
import styles from './Image.css'
import { useEventListener, useBoolean } from 'utils/react/hooks'

Image.propTypes = {
    url: PropTypes.string.isRequired,
    alt: PropTypes.string,
    credit: PropTypes.string,
    copyright: PropTypes.string,
    dimensions: PropTypes.shape({
        height: PropTypes.number.isRequired,
        width: PropTypes.number.isRequired,
    }),
    label: PropTypes.string,
    linkTo: PropTypes.object,
    children: PropTypes.element,
}

export default function Image({
    url,
    alt,
    copyright,
    credit,
    linkTo,
    label,
    children,
}) {
    const [ref, setRef] = useState(null)
    const [loading, unload, load] = useBoolean(false)

    useEventListener('loadend', load, ref)
    useEventListener('loadstart', unload, ref)
    useEventListener('error', unload, ref)

    // useEffect(unload, [url])

    const image = (
        <img ref={setRef} src={url} alt={alt} className={styles.Image} />
    )
    const className = classNames(label, {
        Figure: !loading,
        'Figure--Loading': loading,
    })

    return (
        <figure className={className}>
            {typeof linkTo === 'object' ? (
                <WebLink {...linkTo}>{image}</WebLink>
            ) : (
                image
            )}
            {(copyright || credit) && <Credit>{credit || copyright}</Credit>}
            {children}
        </figure>
    )
}

// Styles
const classNames = classnames.bind(styles)

OpenInNewTab.propTypes = {
    children: PropTypes.node.isRequired,
}

export function OpenInNewTab({ children }) {
    const child = Children.only(children)
    const { url, alt } = child.props

    return (
        <a href={url} title={alt} target={alt}>
            {child}
        </a>
    )
}
