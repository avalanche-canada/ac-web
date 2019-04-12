import React from 'react'
import PropTypes from 'prop-types'
import Button from 'components/button'
import * as Icons from 'components/icons'
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
            {isPlaying ? (
                <Pause onClick={onPause} />
            ) : (
                <Play onClick={onPlay} />
            )}
            {onNext && <Next onClick={onNext} />}
            {onLast && <Last onClick={onLast} />}
        </div>
    )
}

// Buttons
function Play(props) {
    return (
        <Button {...props} title="Play the animation">
            <Icons.Play inverse />
        </Button>
    )
}
function Pause(props) {
    return (
        <Button {...props} title="Pause the animation">
            <Icons.Pause inverse />
        </Button>
    )
}
function Next(props) {
    return (
        <Button {...props} title="Move to the next image">
            <Icons.ChevronRight color={WHITE} />
        </Button>
    )
}
function Previous(props) {
    return (
        <Button {...props} title="Move to the previous image">
            <Icons.ChevronLeft color={WHITE} />
        </Button>
    )
}
function First(props) {
    return (
        <Button {...props} title="Move to the first image">
            <Icons.FirstPage inverse />
        </Button>
    )
}
function Last(props) {
    return (
        <Button {...props} title="Mode to the last image">
            <Icons.LastPage inverse />
        </Button>
    )
}
