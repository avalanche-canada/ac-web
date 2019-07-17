import React from 'react'
import { useReport } from './Context'
import ImageGallery from 'components/gallery'

export default function Gallery() {
    const report = useReport()

    if (!Array.isArray(report?.uploads) || report.uploads.length === 0) {
        return null
    }

    const items = report.uploads.map(upload => ({
        original: `/api/min/uploads/${upload}`,
    }))

    return (
        <ImageGallery
            items={items}
            showBullets={items.length > 1}
            showPlayButton={items.length > 1}
            showThumbnails={false}
        />
    )
}
