import React from 'react'
import PropTypes from 'prop-types'
import {defaultProps} from 'recompose'
import CSSModules from 'react-css-modules'
import BaseButton, {PRIMARY} from '/components/button'
import styles from './Loop.css'
import {
    FirstPage,
    LastPage,
    Play,
    Pause,
    ChevronRight,
    ChevronLeft
} from '/components/icons'

const Button = defaultProps({
    kind: PRIMARY
})(BaseButton)

function AnimateButton({isPlaying, onPause, onPlay}) {
	const title = `${isPlaying ? 'Pause' : 'Play'} the animation`
	const onClick = isPlaying ? onPause : onPlay

	return (
		<Button {...{onClick, title}} >
			{isPlaying ? <Pause inverse /> : <Play inverse />}
		</Button>
	)
}
function Next(props) {
	return (
		<Button {...props} title='Move to the next image'>
			<ChevronRight inverse />
		</Button>
	)
}
function Previous(props) {
	return (
		<Button {...props} title='Move to the previous image'>
			<ChevronLeft inverse />
		</Button>
	)
}
function First(props) {
	return (
		<Button {...props} title='Move to the first image'>
			<FirstPage inverse />
		</Button>
	)
}
function Last(props) {
	return (
		<Button {...props} title='Mode to the last image'>
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

function ButtonSet({
    isPlaying = true,
	onNext,
	onPrevious,
	onFirst,
	onLast,
	onPause,
	onPlay,
}) {
	return (
		<div styleName='ButtonSet'>
			{onFirst && <First onClick={onFirst} />}
			{onPrevious && <Previous onClick={onPrevious} />}
			<AnimateButton {...{onPause, onPlay, isPlaying}} />
			{onNext && <Next onClick={onNext} />}
			{onLast && <Last onClick={onLast} />}
		</div>
	)
}

export default CSSModules(ButtonSet, styles)
