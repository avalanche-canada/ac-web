import React from 'react'
import { compose, withProps, defaultProps } from 'recompose'
import Slider from 'components/slider'
import { StructuredText } from 'prismic/components/base'
import styles from './Slider.css'

export default compose(
    defaultProps({
        showThumbnails: false,
        autoPlay: true,
        slideInterval: 5000,
    }),
    withProps(({ value }) => ({
        items: value.map(({ image, content }) => ({
            src: image.main.url,
            children: (
                <StructuredText value={content} className={styles.Item} />
            ),
        })),
    }))
)(Slider)
