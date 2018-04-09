import React from 'react'
import { Consumer } from './Context'
import ImageGallery from 'components/gallery'
import styles from './HotZoneReport.css'

export default function Gallery() {
    return (
        <Consumer>
            {report => {
                if (
                    !report ||
                    !Array.isArray(report.data.hotzoneImages) ||
                    report.data.hotzoneImages.length === 0
                ) {
                    return null
                }

                const items = report.data.hotzoneImages.map(
                    ({ hotzoneImage, caption }) => ({
                        original: hotzoneImage.main.url,
                        description: caption,
                    })
                )

                return (
                    <div className={styles.Gallery}>
                        <ImageGallery
                            items={items}
                            showBullets={items.length > 1}
                            showPlayButton={items.length > 1}
                            showThumbnails={false}
                        />
                    </div>
                )
            }}
        </Consumer>
    )
}
