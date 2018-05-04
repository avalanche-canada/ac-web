import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { StructuredText } from 'prismic/components/base'
import Gallery from './Gallery'
import Video from './Video'

Content.propTypes = {
    text1: StructuredText.propTypes.value,
    text2: StructuredText.propTypes.value,
    text3: StructuredText.propTypes.value,
    text4: StructuredText.propTypes.value,
    title: PropTypes.string.isRequired,
    gallery: PropTypes.array.isRequired,
    videoSource: PropTypes.object,
}

// TODO: Modify all Prismic tutorial documents

export default function Content({
    text1,
    text2,
    text3,
    text4,
    title,
    gallery,
    videoSource,
}) {
    return (
        <Fragment>
            <h1>{title}</h1>
            {text1 && <StructuredText value={text1} />}
            {videoSource && <Video src={videoSource} />}
            {text2 && <StructuredText value={text2} />}
            {Array.isArray(gallery) && <Gallery images={gallery} />}
            {text3 && <StructuredText value={text3} />}
            {text4 && <StructuredText value={text4} />}
        </Fragment>
    )
}
