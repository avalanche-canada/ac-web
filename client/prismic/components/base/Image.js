import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { useEventListener, useBoolean } from 'hooks'
import { Credit } from 'components/misc'
import Hyperlink from './Hyperlink'
import css from './Image.module.css'

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
    imageRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({
            current: PropTypes.any,
        }),
    ]),
}

export default function Image({
    url,
    alt,
    copyright,
    dimensions,
    credit,
    linkTo,
    label,
    children,
    imageRef,
}) {
    const [ref, setRef] = useState(imageRef)
    const [loading, unload, load] = useBoolean(
        'onloadend' in HTMLImageElement.prototype // Only put it to "loading" if we can eventually get notified when it ends
    )

    // useEventListener('loadstart', unload, ref)
    useEventListener('loadend', load, ref)
    useEventListener('error', unload, ref)

    function handleRef(ref) {
        setRef(ref)
        if (typeof imageRef === 'function') {
            imageRef(ref)
        } else if (imageRef && 'current' in imageRef) {
            imageRef.current = ref
        }
    }

    const image = <img ref={handleRef} src={url} alt={alt} className={css.Image} {...dimensions} />
    const className = classnames(label, {
        [css.Figure]: !loading,
        [css['Figure--Loading']]: loading,
    })

    return (
        <figure className={className}>
            {typeof linkTo === 'object' ? <Hyperlink {...linkTo}>{image}</Hyperlink> : image}
            {(copyright || credit) && <Credit>{credit || copyright}</Credit>}
            {children}
        </figure>
    )
}
