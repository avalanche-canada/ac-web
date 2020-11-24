import React from 'react'
import PropTypes from 'prop-types'
import { useIntl } from 'react-intl'
import Button from 'components/button'
import { Play, Pause, ChevronRight, ChevronLeft, FirstPage, LastPage } from 'components/icons'
import { WHITE } from 'constants/colors'
import styles from './Loop.module.css'

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
            {isPlaying ? <PauseButton onClick={onPause} /> : <PlayButton onClick={onPlay} />}
            {onNext && <NextButton onClick={onNext} />}
            {onLast && <LastButton onClick={onLast} />}
        </div>
    )
}

// Buttons
function PlayButton(props) {
    const intl = useIntl()
    const title = intl.formatMessage({
        description: 'Component loop',
        defaultMessage: 'Play the animation',
    })

    return (
        <Button {...props} title={title}>
            <Play inverse />
        </Button>
    )
}
function PauseButton(props) {
    const intl = useIntl()
    const title = intl.formatMessage({
        description: 'Component loop',
        defaultMessage: 'Pause the animation',
    })

    return (
        <Button {...props} title={title}>
            <Pause inverse />
        </Button>
    )
}
function NextButton(props) {
    const intl = useIntl()
    const title = intl.formatMessage({
        description: 'Component loop',
        defaultMessage: 'Move to the next image',
    })

    return (
        <Button {...props} title={title}>
            <ChevronRight color={WHITE} />
        </Button>
    )
}
function PreviousButton(props) {
    const intl = useIntl()
    const title = intl.formatMessage({
        description: 'Component loop',
        defaultMessage: 'Move to the previous image',
    })

    return (
        <Button {...props} title={title}>
            <ChevronLeft color={WHITE} />
        </Button>
    )
}
function FirstButton(props) {
    const intl = useIntl()
    const title = intl.formatMessage({
        description: 'Component loop',
        defaultMessage: 'Move to the first image',
    })

    return (
        <Button {...props} title={title}>
            <FirstPage inverse />
        </Button>
    )
}
function LastButton(props) {
    const intl = useIntl()
    const title = intl.formatMessage({
        description: 'Component loop',
        defaultMessage: 'Move to the last image',
    })

    return (
        <Button {...props} title={title}>
            <LastPage inverse />
        </Button>
    )
}
