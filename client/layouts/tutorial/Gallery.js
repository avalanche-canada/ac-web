import React from 'react'
import PropTypes from 'prop-types'
import { Media, Caption } from 'components/media'
import { Image } from 'prismic/components/base'

Gallery.propTypes = {
    images: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default function Gallery({ images }) {
    return (
        <div>
            {images
                .filter(Boolean)
                .filter(image => Boolean(image.picture))
                .map(({ picture, credit, caption }, index) => (
                    <GalleryImage
                        key={index}
                        url={picture.main.url}
                        credit={credit}
                        caption={caption}
                    />
                ))}
        </div>
    )
}

GalleryImage.propTypes = {
    url: PropTypes.string,
    caption: PropTypes.string,
    credit: PropTypes.string,
}

function GalleryImage({ url, caption, credit }) {
    if (!url) {
        return null
    }

    return (
        <Media>
            <Image url={url} copyright={credit} />
            {caption && <Caption>{caption}</Caption>}
        </Media>
    )
}
