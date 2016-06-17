import React, {PropTypes, Component} from 'react'
import {Animation, Toolbar, Title} from './animation'
import Image from './Image'
import {formatLoop as format} from './utils/Url'
import keycode from 'keycode'
import range from 'lodash.range'

const HOURS = new Map([
	['AC_RDPS_BC_12hr-precip', range(0, 48, 12)],
	['AC_RDPS_BC_2500m-wind', range(0, 48, 6)],
	['AC_RDPS_BC_3hr-precip', range(0, 48, 3)],
	['AC_RDPS_BC_freezing-level', range(0, 48, 6)],
	['AC_RDPS_BC_hal-24hr-snowfall', range(0, 48, 3)],
	['AC_RDPS_BC_weather-systems', range(0, 48, 6)],
	['AC_GDPS_BC_12hr-precip', range(0, 144, 12)],
	['AC_GDPS_BC_1500m-temp', range(0, 144, 6)],
    ['AC_GDPS_BC_2500m-wind', range(0, 144, 6)],
	['AC_GDPS_EPA_clouds-500hgts', range(0, 144, 6)],
	['AC_GDPS_EPA_pacific-systems', range(0, 144, 6)],
	['AC_GDPS_EPA_precipitable-water', range(0, 144, 6)],
	['AC_HRDPS_BC_wms-1hr-precip', range(0, 48)],
	['AC_HRDPS_BC_wms-cumulative-precip', range(0, 48, 6)],

	['AC_RDPS_BC_12hr-precip1', range(12, 48 + 1, 12)],
	['AC_RDPS_BC_precip-types', range(0, 48, 3)],
	['AC_RDPS_W-CST_3hr-precip-clds-th-slp', range(0, 48, 6)],
	['AC_GDPS_BC_750-wind', range(0, 144, 6)],
	['AC_GDPS_BC_850-temp', range(0, 144, 6)],
	['AC_GDPS_EPA_clouds-precip-th-slp', range(0, 144, 6)],
	['AC_GDPS_EPA_clouds-th-500hts', range(0, 144, 6)],
	['AC_GDPS_EPA_tpw', range(0, 144, 6)],
	['AC_GDPS_W-CAN_precip-th-slp', range(0, 144, 6)],
	['AC_HRDPS_BC_wms-1hr-precip1', range(0, 42)],
	['AC_HRDPS_BC-LAM_1hr-precip', range(0, 42)],
	['AC_HRDPS_S-CST_12hr-precip', range(12, 48, 12)],
	['AC_HRDPS_S-INT_12hr-precip', range(12, 48, 12)],
])

const RUNS = new Map([
	['AC_RDPS_BC_12hr-precip', range(0, 24, 6)],
	['AC_RDPS_BC_2500m-wind', range(0, 24, 6)],
	['AC_RDPS_BC_3hr-precip', range(0, 24, 6)],
	['AC_RDPS_BC_freezing-level', range(0, 24, 6)],
	['AC_RDPS_BC_hal-24hr-snowfall', range(0, 24, 6)],
	['AC_RDPS_BC_weather-systems', range(0, 24, 6)],
	['AC_GDPS_BC_12hr-precip', range(0, 24, 6)],
	['AC_GDPS_BC_1500m-temp', range(0, 24, 6)],
    ['AC_GDPS_BC_2500m-wind', range(0, 24, 6)],
	['AC_GDPS_EPA_clouds-500hgts', range(0, 24, 6)],
	['AC_GDPS_EPA_pacific-systems', range(0, 24, 6)],
	['AC_GDPS_EPA_precipitable-water', range(0, 24, 6)],
	['AC_HRDPS_BC_wms-1hr-precip', range(0, 24, 6)],
	['AC_HRDPS_BC_wms-cumulative-precip', range(0, 24, 6)],

	['AC_RDPS_BC_12hr-precip1', range(0, 24, 6)],
	['AC_RDPS_BC_precip-types', range(0, 24, 6)],
	['AC_RDPS_W-CST_3hr-precip-clds-th-slp', range(0, 24, 6)],
	['AC_GDPS_BC_750-wind', range(0, 24, 6)],
	['AC_GDPS_BC_850-temp', range(0, 24, 6)],
	['AC_GDPS_EPA_clouds-precip-th-slp', range(0, 24, 6)],
	['AC_GDPS_EPA_clouds-th-500hts', range(0, 24, 6)],
	['AC_GDPS_EPA_tpw', range(0, 24, 6)],
	['AC_GDPS_W-CAN_precip-th-slp', range(0, 24, 6)],
	['AC_HRDPS_BC_wms-1hr-precip1', [6, 18]],
	['AC_HRDPS_BC-LAM_1hr-precip', [6, 18]],
	['AC_HRDPS_S-CST_12hr-precip', [6, 18]],
	['AC_HRDPS_S-INT_12hr-precip', [6, 18]],
])

export const TYPES = [...HOURS.keys()]

export default class Loop extends Component {
	static propTypes = {
		type: PropTypes.oneOf(TYPES).isRequired,
		run: PropTypes.number.isRequired,
		date: PropTypes.instanceOf(Date).isRequired,
        hours: PropTypes.arrayOf(PropTypes.number),
        interval: PropTypes.number,
	}
    static defaultProps = {
        date: new Date(),
        interval: 1000,
    }
	state = {
		cursor: 0,
		isPlaying: true,
		isBroken: true,
	}
	get cursor() {
		return this.state.cursor
	}
	set cursor(cursor) {
        this.setState({ cursor }, this.boundShake)
	}
    get isPlaying() {
        return this.state.isPlaying
    }
    set isPlaying(isPlaying) {
        this.setState({ isPlaying }, this.boundShake)
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
		return this.props.hours || HOURS.get(this.props.type)
	}
    clearTimeout() {
        window.clearTimeout(this.timeoutID)
    }
    setTimeout() {
        const { interval } = this.props

        this.timeoutID = window.setTimeout(this.handleNext, interval)
    }
    shake() {
        this.clearTimeout()

        if (this.isPlaying) {
            this.setTimeout()
        }
    }
	next = () => {
		if (this.maxCursor === this.cursor) {
            this.cursor = 0
		} else {
			this.cursor = this.cursor + 1
		}
	}
	prev = () => {
		if (this.cursor === 0) {
            this.cursor = this.maxCursor
		} else {
			this.cursor = this.cursor - 1
		}
	}
	first = () => {
        this.pause()
		this.cursor = 0
	}
	last = () => {
        this.pause()
		this.cursor = this.maxCursor
	}
	play = () => {
        this.isPlaying = true
	}
    pause = () => {
        this.isPlaying = false
    }
	componentDidMount() {
		window.addEventListener('keydown', this.handleKeyDown)
        this.shake()
	}
	componentWillUnmount() {
		window.removeEventListener('keydown', this.handleKeyDown)
        this.clearTimeout()
	}
	onKeyDown = ({ keyCode }) => {
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
	handleImageLoad = () => {
		this.isBroken = false
	}
	handleImageError = () => {
		this.isBroken = true
	}
	get of() {
		return `${this.cursor + 1} of ${this.hours.length}`
	}
	render() {
		const { type, date } = this.props
        let { run } = this.props

        if (typeof run !== 'number') {
            run = RUNS.get(type)[0]
        }

		const hour = this.hours[this.cursor]
		const src = format({ type, date, run, hour })

        const toolbar = {
			isPlaying: this.state.isPlaying,
			onNext: this.next,
			onPrevious: this.previous,
			onFirst: this.first,
			onLast: this.last,
			onPlay: this.play,
			onPause: this.pause,
		}

		const image = {
			src,
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
