import React, {PropTypes, Component, DOM} from 'react'
import keycode from 'keycode'
import {Image} from 'components/misc'
import Container from './Container'
import Toolbar from './Toolbar'
import Title from './Title'
import {wait} from 'compose'

const Loading = wait(250)(DOM.div)

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
		isLoading: false,
	}
	get cursor() {
		return this.state.cursor
	}
	set cursor(cursor) {
        this.setState({cursor}, () => {
            this.isLoading = true
        })
	}
    get isPlaying() {
        return this.state.isPlaying
    }
    set isPlaying(isPlaying) {
        this.setState({isPlaying}, () => {
            this.clearTimeout()

            if (isPlaying) {
                this.setTimeout()
            }
        })
    }
    get isLoading() {
        return this.state.isLoading
    }
    set isLoading(isLoading) {
        this.setState({isLoading}, () => {
            if (!isLoading && this.isPlaying) {
                this.setTimeout()
            }
        })
    }
	get maxCursor() {
		return this.props.urls.length - 1
	}
    get url() {
        return this.props.urls[this.cursor]
    }
    clearTimeout() {
        window.clearTimeout(this.timeoutId)
    }
    setTimeout() {
        this.timeoutId = window.setTimeout(this.next, this.props.interval)
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
        this.clearTimeout()
	}
	componentWillUnmount() {
		window.removeEventListener('keydown', this.handleKeyDown)
        this.clearTimeout()
	}
	handleKeyDown = ({keyCode}) => {
		const {left, right} = keycode.codes

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
        this.isLoading = false
	}
	handleImageError = () => {
        this.isLoading = false
	}
	render() {
        const toolbar = {
			isPlaying: this.isPlaying,
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
				<Toolbar {...toolbar} />
                <Title style={TITLE_STYLES.get(this.props.layout)}>
                    {this.cursor + 1} of {this.maxCursor + 1}
                    {this.isLoading && <Loading>Loading...</Loading>}
                </Title>
				<Image {...image} />
			</Container>
		)
	}
}
