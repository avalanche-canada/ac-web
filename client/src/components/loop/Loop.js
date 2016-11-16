import React, {PropTypes, Component} from 'react'
import keycode from 'keycode'
import {Image} from 'components/misc'
import Container from './Container'
import Toolbar from './Toolbar'
import Title from './Title'

const LEFT = 'LEFT'
const RIGHT = 'RIGHT'

const TITLE_STYLES = new Map([
    [LEFT, null],
    [RIGHT, {
        right: 0,
        left: 'auto',
    }],
])

export default class Loop extends Component {
	static propTypes = {
        urls: PropTypes.arrayOf(PropTypes.string),
        interval: PropTypes.number,
        openImageInNewTab: PropTypes.bool,
        layout: PropTypes.oneOf([LEFT, RIGHT]),
	}
    static defaultProps = {
        urls: [],
        interval: 1000,
        openImageInNewTab: false,
        layout: LEFT,
    }
	state = {
		cursor: 0,
		isPlaying: false,
		isBroken: true,
	}
	get cursor() {
		return this.state.cursor
	}
	set cursor(cursor) {
        this.setState({ cursor }, this.shake)
	}
    get isPlaying() {
        return this.state.isPlaying
    }
    set isPlaying(isPlaying) {
        this.setState({ isPlaying }, this.shake)
    }
	get maxCursor() {
		return this.props.urls.length - 1
	}
	get isBroken() {
		return this.state.isBroken
	}
	set isBroken(isBroken) {
		this.setState({ isBroken })
	}
    get url() {
        return this.props.urls[this.cursor]
    }
    clearTimeout() {
        window.clearTimeout(this.timeoutId)
    }
    setTimeout() {
        const { interval } = this.props

        this.timeoutId = window.setTimeout(this.next, interval)
    }
    shake = () => {
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
	previous = () => {
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
	handleKeyDown = ({ keyCode }) => {
		const { left, right } = keycode.codes

		switch (keyCode) {
			case left:
				this.previous()
				break;
			case right:
				this.next()
				break;
		}
	}
	handleImageLoad = () => {
        console.warn('loaded')
		this.isBroken = false
	}
	handleImageError = () => {
		this.isBroken = true
	}
	get of() {
		return `${this.cursor + 1} of ${this.props.urls.length}`
	}
	render() {
        const {isBroken} = this
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
			src: this.url,
			onError: this.handleImageError,
			onLoad: this.handleImageLoad,
            openNewTab: this.props.openImageInNewTab,
		}

		return (
			<Container>
				{isBroken || <Toolbar {...toolbar} />}
				{isBroken ||
                    <Title style={TITLE_STYLES.get(this.props.layout)}>{this.of}</Title>
                }
				<Image {...image} />
			</Container>
		)
	}
}
