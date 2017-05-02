import React, { DOM } from 'react'
import { defaultProps, withProps } from 'recompose'
import Gallery from 'react-image-gallery'
import {
    Play,
    Pause,
    Fullscreen,
    ChevronRight,
    ChevronLeft,
} from '~/components/icons'
import 'react-image-gallery/styles/css/image-gallery-no-icon.css'

const Button = defaultProps({
    type: 'button',
})(DOM.button)

export default withProps({
    renderLeftNav(onClick, disabled) {
        return (
            <Button
                className="image-gallery-left-nav"
                onClick={onClick}
                disabled={disabled}>
                <ChevronLeft height={36} width={36} inverse />
            </Button>
        )
    },
    renderRightNav(onClick, disabled) {
        return (
            <Button
                className="image-gallery-right-nav"
                onClick={onClick}
                disabled={disabled}>
                <ChevronRight height={36} width={36} inverse />
            </Button>
        )
    },
    renderPlayPauseButton(onClick, isPlaying) {
        return (
            <Button className="image-gallery-play-button" onClick={onClick}>
                {isPlaying ? <Pause inverse /> : <Play inverse />}
            </Button>
        )
    },
    renderFullscreenButton(onClick, _isFullscreen) {
        return (
            <Button
                className="image-gallery-fullscreen-button"
                onClick={onClick}>
                <Fullscreen inverse />
            </Button>
        )
    },
})(Gallery)
