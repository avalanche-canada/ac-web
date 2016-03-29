import React, { PropTypes } from 'react'
import Button from '../../components/button'
import styles from './Animation.css'
import CSSModules from 'react-css-modules'
import { FirstPage, LastPage, Play, Pause, ChevronRight, ChevronLeft} from '../../components/icons'

function AnimateButton({
	isPlaying,
	onPause,
	onPlay,
}) {
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
function Prev(props) {
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

const { func, bool } = PropTypes

AnimationToolbar.propTypes = {
	isPlaying: bool,
	onNext: func,
	onPrevious: func,
	onFirst: func,
	onLast: func,
	onPause: func,
	onPlay: func,
}

function AnimationToolbar({
	onNext,
	onPrevious,
	onFirst,
	onLast,
	onPause,
	onPlay,
	isPlaying = true,
}) {
	return (
		<div styleName='Toolbar'>
			{onFirst && <First onClick={onFirst} />}
			{onPrevious && <Prev onClick={onPrevious} />}
			<AnimateButton {...{onPause, onPlay, isPlaying}} />
			{onNext && <Next onClick={onNext} />}
			{onLast && <Last onClick={onLast} />}
		</div>
	)
}

export default CSSModules(AnimationToolbar, styles)
