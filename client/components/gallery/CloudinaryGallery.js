import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Gallery from './Gallery'
import * as cloudinary from 'services/cloudinary'

CloudinaryGallery.propTypes = {
    tag: PropTypes.string.isRequired,
}

export default function CloudinaryGallery({ tag }) {
    const [state, set] = useState({ cursor: null, items: [] })

    useEffect(() => {
        const options = { next_cursor: state.cursor }

        cloudinary.getByTag(tag, options).then(data => {
            set({
                cursor: data.next_cursor,
                items: data.resources.map(cloudinary.mapToSizeFactory()),
            })
        })
    }, [])

    return <Gallery {...state} />
}
