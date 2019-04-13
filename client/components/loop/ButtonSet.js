import React from 'react'
import PropTypes from 'prop-types'
import Button from 'components/button'
import {
    Play,
    Pause,
    ChevronRight,
    ChevronLeft,
    FirstPage,
    LastPage,
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
            {onFirst && <FirstButton onClick={onFirst} />}
            {onPrevious && <PreviousButton onClick={onPrevious} />}
            {isPlaying ? (
                <PauseButton onClick={onPause} />
            ) : (
                <PlayButton onClick={onPlay} />
            )}
            {onNext && <NextButton onClick={onNext} />}
            {onLast && <LastButton onClick={onLast} />}
        </div>
    )
}

// Buttons
const PlayButton = button('Play the animation', <Play inverse />)
const PauseButton = button('Pause the animation', <Pause inverse />)
const NextButton = button(
    'Move to the next image',
    <ChevronRight color={WHITE} />
)
const PreviousButton = button(
    'Move to the previous image',
    <ChevronLeft color={WHITE} />
)
const FirstButton = button('Move to the first image', <FirstPage inverse />)
const LastButton = button('Move to the last image', <LastPage inverse />)

function button(title, icon) {
    return props => (
        <Button {...props} title={title}>
            {icon}
        </Button>
    )
}
