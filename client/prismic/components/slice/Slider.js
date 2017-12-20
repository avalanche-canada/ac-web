import React, { Component } from 'react'
import ImageGallery from 'components/gallery'
import { StructuredText } from 'prismic/components/base'
import styles from './Slider.css'

export default class Slider extends Component {
    static defaultProps = {
        showThumbnails: false,
        autoPlay: true,
        slideInterval: 5000,
    }
    render() {
        const { value, ...props } = this.props

        return (
            <ImageGallery
                items={value.map(createItem)}
                renderItem={renderItem}
                showBullets={value.length > 0}
                {...props}
            />
        )
    }
}

function createItem({ image, content }) {
    return {
        src: image.main.url,
        children: <StructuredText value={content} className={styles.Item} />,
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
