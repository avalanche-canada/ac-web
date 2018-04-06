import React from 'react'
import PropTypes from 'prop-types'
import ImageGallery from 'components/gallery'

Gallery.propTypes = {
    images: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default function Gallery({ images }) {
    return (
        <ImageGallery
            items={images.map(toGalleryItem)}
            showBullets={images.length > 1}
            showPlayButton={images.length > 1}
            showThumbnails={false}
        />
    )
}

// Utils
function toGalleryItem(upload) {
    return {
        original: `/api/min/uploads/${upload}`,
    }
}
