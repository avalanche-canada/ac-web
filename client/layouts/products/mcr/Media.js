import React from 'react'
import PropTypes from 'prop-types'
import Gallery from 'components/gallery'
import IMAGE from 'styles/mountain-climbers-default.jpg'

Media.propTypes = {
    images: PropTypes.array,
}

export default function Media({ images }) {
    if (!Array.isArray(images) || images.length === 0) {
        return <img src={IMAGE} />
    } else {
        return (
            <Gallery
                items={images.map(original => ({ original }))}
                showThumbnails={false}
                showBullets={images.length > 1}
                showPlayButton={false}
            />
        )
    }
}
