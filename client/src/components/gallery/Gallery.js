import React, {PropTypes} from 'react'
import {compose, lifecycle, withState, withHandlers, setPropTypes, withProps} from 'recompose'
import ImageGallery from 'react-image-gallery'
import CSSModules from 'react-css-modules'
import * as cloudinary from 'services/cloudinary'
import 'react-image-gallery/build/image-gallery.css'
import {Fullscreen} from 'components/icons'
import Button, {INCOGNITO} from 'components/button'
import styles from './Gallery.css'

const mapResource = cloudinary.mapToSizeFactory()

const FullScreenButton = compose(
    withProps({
        icon: <Fullscreen inverse />,
        title: 'Go full screen',
        kind: INCOGNITO,
    })
)(Button)

export function Gallery({
    images,
    setGalleryInstance,
    fullScreen = false,
    onFullScreenClick,
    onPlayClick,
    onPauseClick,
    ...props
}) {
    return (
        <div styleName='Container'>
            <div styleName='Controls'>
                {fullScreen && <FullScreenButton onClick={onFullScreenClick} />}
            </div>
            <ImageGallery items={images} ref={setGalleryInstance} {...props} />
        </div>
    )
}

export default compose(
    setPropTypes({
        tag: PropTypes.string.isRequired,
        fullScreen: PropTypes.bool,
    }),
    withState('instance', 'setGalleryInstance', null),
    withState('cursor', 'setCursor', null),
    withState('images', 'setImages', []),
    withHandlers({
        onPlayClick: ({instance}) => event => {
            instance.play()
        },
        onPauseClick: ({instance}) => event => {
            instance.play()
        },
        onFullScreenClick: ({instance}) => event => {
            instance.fullScreen()
        },
        onSuccessResponse: props => data => {
            const {setImages, setCursor} = props
            const {resources, next_cursor} = data

            setCursor(next_cursor)
            setImages(resources.map(mapResource))
        },
    }),
    lifecycle({
        componentDidMount() {
            const {tag, cursor, onSuccessResponse} = this.props
            const options = {
                next_cursor: cursor
            }

            cloudinary.getByTag(tag, options).then(onSuccessResponse)
        },
    }),
    CSSModules(styles),
)(Gallery)
