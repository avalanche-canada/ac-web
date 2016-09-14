import React from 'react'
import {compose, withProps, defaultProps} from 'recompose'
import Slider from 'components/slider'
import {InnerHTML} from 'components/misc'
import styles from './Slider.css'

const {Item} = styles

export default compose(
    defaultProps({
        showThumbnails: false,
        autoPlay: true,
        slideInterval: 5000,
    }),
    withProps(({content}) => ({
        items: content.map(({image, content}) => ({
            src: image.url,
            children: (
                <InnerHTML className={Item}>
                    {content}
                </InnerHTML>
            ),
        }))
    })),
)(Slider)
