import React from 'react'
import {compose, withState, withHandlers, setPropTypes, withProps, defaultProps} from 'recompose'
import ImageGallery from 'react-image-gallery'

export default compose(
    withState('instance', 'ref', null),
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
