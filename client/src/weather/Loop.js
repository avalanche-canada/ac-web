import React, { PropTypes, Component } from 'react'
import { Animation, Toolbar, Image, Title } from './animation'
import { formatLoop as format } from './utils/Url'
import keycode from 'keycode'
import memoize from 'lodash.memoize'
import range from 'lodash.range'

const memoizedRange = memoize(range)

const HOURS = new Map([
	['AC_RDPS_BC_12hr-precip', memoizedRange(0, 48, 12)],
	['AC_RDPS_BC_2500m-wind', memoizedRange(0, 48, 6)],
	['AC_RDPS_BC_3hr-precip', memoizedRange(0, 48, 3)],
	['AC_RDPS_BC_freezing-level', memoizedRange(0, 48, 6)],
	['AC_RDPS_BC_hal-24hr-snowfall', memoizedRange(0, 48, 3)],
	['AC_RDPS_BC_weather-systems', memoizedRange(0, 48, 6)],
	['AC_GDPS_BC_12hr-precip', memoizedRange(0, 144, 12)],
	['AC_GDPS_BC_1500m-temp', memoizedRange(0, 144, 6)],
	['AC_GDPS_BC_2500m-wind', memoizedRange(0, 144, 6)],
	['AC_GDPS_EPA_clouds-500hgts', memoizedRange(0, 144, 6)],
	['AC_GDPS_EPA_pacific-systems', memoizedRange(0, 144, 6)],
	['AC_GDPS_EPA_precipitable-water', memoizedRange(0, 144, 6)],
	['AC_HRDPS_BC_wms-1hr-precip', memoizedRange(0, 48)],
	['AC_HRDPS_BC_wms-cumulative-precip', memoizedRange(0, 48, 6)],

	['AC_RDPS_BC_12hr-precip1', memoizedRange(0, 48, 12)],
	['AC_RDPS_BC_precip-types', memoizedRange(0, 48, 3)],
	['AC_RDPS_W-CST_3hr-precip-clds-th-slp', memoizedRange(0, 48, 6)],
	['AC_GDPS_BC_750-wind', memoizedRange(0, 144, 6)],
	['AC_GDPS_BC_850-temp', memoizedRange(0, 144, 6)],
	['AC_GDPS_EPA_clouds-precip-th-slp', memoizedRange(0, 144, 6)],
	['AC_GDPS_EPA_clouds-th-500hts', memoizedRange(0, 144, 6)],
	['AC_GDPS_EPA_tpw', memoizedRange(0, 144, 6)],
	['AC_GDPS_W-CAN_precip-th-slp', memoizedRange(0, 144, 6)],
	['AC_HRDPS_BC_wms-1hr-precip1', memoizedRange(0, 42)],
	['AC_HRDPS_BC-LAM_1hr-precip', memoizedRange(0, 42)],
	['AC_HRDPS_S-CST_12hr-precip', memoizedRange(12, 36, 12)],
	['AC_HRDPS_S-INT_12hr-precip', memoizedRange(12, 36, 12)],
])
const TYPES = [...HOURS.keys()]

export default class Loop extends Component {
	static propTypes = {
		type: PropTypes.oneOf(TYPES).isRequired,
		run: PropTypes.oneOf(range(0, 24, 6)),
		date: PropTypes.instanceOf(Date).isRequired,
	}
	state = {
		cursor: 0,
		isPlaying: false,
		isBroken: true,
	}
	constructor(...args) {
		super(...args)

		this.handleNext = this.next.bind(this)
		this.handlePrevious = this.prev.bind(this)
		this.handleFirst = this.first.bind(this)
		this.handleLast = this.last.bind(this)
		this.handlePlay = this.play.bind(this)
		this.handlePause = this.pause.bind(this)
		this.handleKeyDown = this.onKeyDown.bind(this)

		this.handleImageError = this.onImageError.bind(this)
		this.handleImageLoad = this.onImageLoad.bind(this)
	}
	get cursor() {
		return this.state.cursor
	}
	set cursor(cursor) {
		this.setState({ cursor })
	}
	get maxCursor() {
		return this.hours.length - 1
	}
	get isBroken() {
		return this.state.isBroken
	}
	set isBroken(isBroken) {
		this.setState({ isBroken })
	}
	get hours() {
		return HOURS.get(this.props.type)
	}
	next() {
		if (this.maxCursor === this.cursor) {
			this.first()
		} else {
			this.cursor = this.cursor + 1
		}
	}
	prev() {
		if (this.cursor === 0) {
			this.last()
		} else {
			this.cursor = this.cursor - 1
		}
	}
	first() {
		this.cursor = 0
	}
	last() {
		this.cursor = this.maxCursor
	}
	play() {
		const isPlaying = true

		this.setState({ isPlaying }, () => {
			this.intervalID = window.setInterval(this.handleNext, 1500)
		})
	}
	pause() {
		const isPlaying = false

		this.setState({ isPlaying }, () => {
			window.clearInterval(this.intervalID)
		})
	}
	componentDidMount() {
		window.addEventListener('keydown', this.handleKeyDown)
	}
	componentWillUnmount() {
		window.removeEventListener('keydown', this.handleKeyDown)
	}
	onKeyDown({ keyCode }) {
		const { left, right } = keycode.codes

		switch (keyCode) {
			case left:
				this.prev()
				break;
			case right:
				this.next()
				break;
		}
	}
	onImageLoad() {
		this.isBroken = false
	}
	onImageError() {
		this.isBroken = true
	}
	get of() {
		return `${this.cursor + 1} of ${this.hours.length}`
	}
	render() {
		const { type, date, run } = this.props
		const hour = this.hours[this.cursor]
		const url = format({ type, date, run, hour })
		const toolbar = {
			isPlaying: this.state.isPlaying,
			onNext: this.handleNext,
			onPrevious: this.handlePrevious,
			onFirst: this.handleFirst,
			onLast: this.handleLast,
			onPlay: this.handlePlay,
			onPause: this.handlePause,
		}

		const image = {
			url,
			onError: this.handleImageError,
			onLoad: this.handleImageLoad,
		}

		return (
			<Animation>
				{this.isBroken || <Toolbar {...toolbar} />}
				{this.isBroken || <Title>{this.of}</Title>}
				<Image {...image} openNewTab />
			</Animation>
		)
	}
}
