import React from 'react'
import textbox from '../textbox'
import ImageGallery from './ImageGallery'

export default textbox.clone({
    renderHelp(locals) {
        const {value, onChange} = locals

        function removeFileAt(index) {
            const files = Array.from(value)

            files.splice(index, 1)

            onChange(files)
        }

        return value ?
            <ImageGallery files={value} onRemove={removeFileAt} /> :
            textbox.renderHelp(locals)
    }
})
