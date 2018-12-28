import React from 'react'
import PropTypes from 'prop-types'
import Button from 'components/button'
import {
    FirstPage,
    LastPage,
    Play,
    Pause,
    ChevronRight,
    ChevronLeft,
} from 'components/icons'
import { WHITE } from 'constants/colors'
import styles from './Loop.css'

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

AnimateButton.propTypes = {
    isPlaying: PropTypes.bool,
    onPause: PropTypes.func,
    onPlay: PropTypes.func,
}

function AnimateButton({ isPlaying = false, onPause, onPlay }) {
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
            <ChevronRight color={WHITE} />
        </Button>
    )
}
function Previous(props) {
    return (
        <Button {...props} title="Move to the previous image">
            <ChevronLeft color={WHITE} />
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
