import React from 'react'
import PropTypes from 'prop-types'
import {compose, withState, defaultProps, setPropTypes} from 'recompose'
import ImageGallery from '~/components/gallery'

export default compose(
    withState('instance', 'ref', null),
    setPropTypes({
        children: PropTypes.node,
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
