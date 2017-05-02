import React from 'react'
import textbox from '../textbox'
import ImageGallery from './ImageGallery'

export default textbox.clone({
    renderHelp(locals) {
        const { value, removeFile } = locals

        return value.length > 0
            ? <ImageGallery files={value} onRemove={removeFile} />
            : textbox.renderHelp(locals)
    },
})
