import React, {PropTypes} from 'react'
import {defaultProps} from 'recompose'
import CSSModules from 'react-css-modules'
import Button, {PRIMARY} from 'components/button'
import styles from './Loop.css'
import {
    FirstPage,
    LastPage,
    Play,
    Pause,
    ChevronRight,
    ChevronLeft
} from 'components/icons'

const ToolbarButton = defaultProps({
    kind: PRIMARY
})(Button)

function AnimateButton({ isPlaying, onPause, onPlay }) {
	const title = `${isPlaying ? 'Pause' : 'Play'} the animation`
	const onClick = isPlaying ? onPause : onPlay

	return (
		<ToolbarButton {...{onClick, title}} >
			{isPlaying ? <Pause inverse /> : <Play inverse />}
		</ToolbarButton>
	)
}
function Next(props) {
	return (
		<ToolbarButton {...props} title='Move to the next image'>
			<ChevronRight inverse />
		</ToolbarButton>
	)
}
function Previous(props) {
	return (
		<ToolbarButton {...props} title='Move to the previous image'>
			<ChevronLeft inverse />
		</ToolbarButton>
	)
}
function First(props) {
	return (
		<ToolbarButton {...props} title='Move to the first image'>
			<FirstPage inverse />
		</ToolbarButton>
	)
}
function Last(props) {
	return (
		<ToolbarButton {...props} title='Mode to the last image'>
			<LastPage inverse />
		</ToolbarButton>
	)
}

Toolbar.propTypes = {
	isPlaying: PropTypes.bool,
	onNext: PropTypes.func,
	onPrevious: PropTypes.func,
	onFirst: PropTypes.func,
	onLast: PropTypes.func,
	onPause: PropTypes.func,
	onPlay: PropTypes.func,
}

function Toolbar({
    isPlaying = true,
	onNext,
	onPrevious,
	onFirst,
	onLast,
	onPause,
	onPlay,
}) {
	return (
		<div styleName='Toolbar'>
			{onFirst && <First onClick={onFirst} />}
			{onPrevious && <Previous onClick={onPrevious} />}
			<AnimateButton {...{onPause, onPlay, isPlaying}} />
			{onNext && <Next onClick={onNext} />}
			{onLast && <Last onClick={onLast} />}
		</div>
	)
}

export default CSSModules(Toolbar, styles)
