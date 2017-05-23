import React from 'react'
import { compose, withProps, defaultProps } from 'recompose'
import Slider from '~/components/slider'
import { parseGroup } from '~/prismic/parsers'
import { StructuredText } from '~/prismic/components/base'
import styles from './Slider.css'

export default compose(
    defaultProps({
        showThumbnails: false,
        autoPlay: true,
        slideInterval: 5000,
    }),
    withProps(props => ({
        items: parseGroup(props).map(({ image, content }) => ({
            src: image.url,
            children: (
                <StructuredText value={content} className={styles.Item} />
            ),
        })),
    }))
)(Slider)
