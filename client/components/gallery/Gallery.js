import React from 'react'
import Base from 'react-image-gallery'
import {
    Play,
    Pause,
    Fullscreen,
    ChevronRight,
    ChevronLeft,
} from 'components/icons'
import { WHITE } from 'constants/colors'
import 'react-image-gallery/styles/css/image-gallery-no-icon.css'

function Button(props) {
    return <button type="button" {...props} />
}

const buttons = {
    renderLeftNav(onClick, disabled) {
        return (
            <Button
                className="image-gallery-left-nav"
                onClick={onClick}
                disabled={disabled}>
                <ChevronLeft height={36} width={36} color={WHITE} />
            </Button>
        )
    },
    renderRightNav(onClick, disabled) {
        return (
            <Button
                className="image-gallery-right-nav"
                onClick={onClick}
                disabled={disabled}>
                <ChevronRight height={36} width={36} color={WHITE} />
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
                <Fullscreen color={WHITE} />
            </Button>
        )
    },
}

export default function Gallery(props) {
    return <Base {...props} {...buttons} />
}
