import React from 'react'
import {compose, withState, withHandlers, setPropTypes, withProps, defaultProps} from 'recompose'
import ImageGallery from 'react-image-gallery'
import 'react-image-gallery/build/image-gallery.css'
import {Play, Pause} from 'components/icons'
import Button, {INCOGNITO} from 'components/button'

export default compose(
    withState('instance', 'ref', null),
    withHandlers({
        onPlayClick: ({instance}) => event => {
            instance.play()
        },
        onPauseClick: ({instance}) => event => {
            instance.play()
        },
    }),
    defaultProps({
        renderItem({children, ...props}) {
            return (
                <div className='image-gallery-image'>
                    <img {...props} />
                    {children}
                </div>
            )
        },
        showBullets: true,
    }),
)(ImageGallery)
