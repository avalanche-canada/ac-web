import React from 'react'
import PropTypes from 'prop-types'
import Button from 'components/button'
import noop from 'lodash/noop'
import {
    FirstPage,
    LastPage,
    Play,
    Pause,
    ChevronRight,
    ChevronLeft,
} from 'components/icons'
import styles from './Loop.css'

AnimateButton.propTypes = {
    isPlaying: PropTypes.bool,
    onPause: PropTypes.func,
    onPlay: PropTypes.func,
}

function AnimateButton({ isPlaying = false, onPause = noop, onPlay = noop }) {
    const title = `${isPlaying ? 'Pause' : 'Play'} the animation`
    const onClick = isPlaying ? onPause : onPlay

    return (
        <Button {...{ onClick, title }}>
            {isPlaying ? <Pause inverse /> : <Play inverse />}
        </Button>
    )
}
function Next(props) {
    return (
        <Button {...props} title="Move to the next image">
            <ChevronRight inverse />
        </Button>
    )
}
function Previous(props) {
    return (
        <Button {...props} title="Move to the previous image">
            <ChevronLeft inverse />
        </Button>
    )
}
function First(props) {
    return (
        <Button {...props} title="Move to the first image">
            <FirstPage inverse />
        </Button>
    )
}
function Last(props) {
    return (
        <Button {...props} title="Mode to the last image">
            <LastPage inverse />
        </Button>
    )
}

ButtonSet.propTypes = {
    isPlaying: PropTypes.bool,
    onNext: PropTypes.func,
    onPrevious: PropTypes.func,
    onFirst: PropTypes.func,
    onLast: PropTypes.func,
    onPause: PropTypes.func,
    onPlay: PropTypes.func,
}

export default function ButtonSet({
    isPlaying = true,
    onNext,
    onPrevious,
    onFirst,
    onLast,
    onPause,
    onPlay,
}) {
    return (
        <div className={styles.ButtonSet}>
            {onFirst && <First onClick={onFirst} />}
            {onPrevious && <Previous onClick={onPrevious} />}
            <AnimateButton {...{ onPause, onPlay, isPlaying }} />
            {onNext && <Next onClick={onNext} />}
            {onLast && <Last onClick={onLast} />}
        </div>
    )
}
