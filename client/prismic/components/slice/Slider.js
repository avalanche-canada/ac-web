import React from 'react'
import ImageGallery from 'components/gallery'
import { StructuredText } from 'prismic/components/base'
import styles from './Slider.css'

Slider.defaultProps = {
    showThumbnails: false,
    autoPlay: true,
    slideInterval: 5000,
}

export default function Slider({ value, ...props }) {
    return (
        <ImageGallery
            items={value.map(createItem)}
            renderItem={renderItem}
            showBullets={value.length > 0}
            {...props}
        />
    )
}

// Utils
function createItem({ image, content }) {
    return {
        src: image.main.url,
        children: (
            <div className={styles.Item}>
                <StructuredText value={content} />
            </div>
        ),
    }
}
function renderItem({ children, ...props }) {
    return (
        <div className="image-gallery-image">
            <img {...props} />
            {children}
        </div>
    )
}
