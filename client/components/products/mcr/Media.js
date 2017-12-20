import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Gallery from 'components/gallery'
import IMAGE from 'styles/mountain-climbers-default.jpg'

export default class Media extends PureComponent {
    static propTypes = {
        images: PropTypes.array,
    }
    render() {
        const { images } = this.props

        if (!Array.isArray(images) || images.length === 0) {
            return <img src={IMAGE} />
        } else {
            return (
                <Gallery
                    items={images.map(original => ({ original }))}
                    showThumbnails={false}
                    showBullets={images.length > 1}
                    showPlayButton={false}
                />
            )
        }
    }
}
