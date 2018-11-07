import React from 'react'
import { Consumer } from './Context'
import ImageGallery from 'components/gallery'

export default function Gallery() {
    return (
        <Consumer>
            {report => {
                if (
                    !report ||
                    !Array.isArray(report.uploads) ||
                    report.uploads.length === 0
                ) {
                    return null
                }

                const items = report.uploads.map(upload => ({
                    original: `https://www.avalanche.ca/api/min/uploads/${upload}`,
                }))

                return (
                    <ImageGallery
                        items={items}
                        showBullets={items.length > 1}
                        showPlayButton={items.length > 1}
                        showThumbnails={false}
                    />
                )
            }}
        </Consumer>
    )
}
