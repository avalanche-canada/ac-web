import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ImageGallery from 'components/gallery'
import styles from './HotZoneReport.css'

export default class Gallery extends PureComponent {
    static propTypes = {
        images: PropTypes.array.isRequired,
    }
    render() {
        const { images } = this.props

        return (
            <div className={styles.Gallery}>
                <ImageGallery
                    items={images.map(buildItem)}
                    showBullets={images.length > 1}
                    showPlayButton={images.length > 1}
                    showThumbnails={false}
                />
            </div>
        )
    }
}

// Utils
function buildItem({ hotzoneImage, caption }) {
    return {
        original: hotzoneImage.main.url,
        description: caption,
    }
}
