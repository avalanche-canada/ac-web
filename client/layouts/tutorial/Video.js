import React from 'react'
import PropTypes from 'prop-types'
import { Media } from 'components/media'

Video.propTypes = {
    src: PropTypes.string.isRequired,
}

export default function Video({ src }) {
    let url = src

    if (/vimeo.com/.test(src)) {
        const [id] = src.split('/').reverse()
        url = `https://player.vimeo.com/video/${id}`
    }

    return (
        <Media>
            <div data-oembed={url}>
                <iframe src={url} />
            </div>
        </Media>
    )
}
