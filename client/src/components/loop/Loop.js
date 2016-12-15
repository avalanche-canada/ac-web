import React, {PropTypes, Component} from 'react'
import {findDOMNode} from 'react-dom'
import CSSModule from 'react-css-modules'
import keycode from 'keycode'
import {Image, Ratio, Delay, Loading} from 'components/misc'
import {Fullscreen} from 'components/icons'
import ButtonSet from './ButtonSet'
import styles from './Loop.css'
import Button, {PRIMARY} from 'components/button'

const FullscreenIcons = new Map([
    [true, <Fullscreen inverse />],
    [false, <Fullscreen inverse />],
])

@CSSModule(styles)
export default class Loop extends Component {
	static propTypes = {
        urls: PropTypes.arrayOf(PropTypes.string),
        interval: PropTypes.number,
        dwell: PropTypes.number,
        openImageInNewTab: PropTypes.bool,
	}
    static defaultProps = {
        urls: [],
        interval: 1000,
        dwell: 2000,
        openImageInNewTab: false,
    }
	state = {
		cursor: 0,
		isPlaying: false,
		isLoading: false,
        isFullscreen: false,
	}
    constructor(props) {
        super(props)

        if ('onfullscreenchange' in document) {
            this.fullscreenchangeEventName = 'fullscreenchange'
        } else if ('onmozfullscreenchange' in document) {
            this.fullscreenchangeEventName = 'mozfullscreenchange'
        } else if ('onwebkitfullscreenchange' in document) {
            this.fullscreenchangeEventName = 'webkitfullscreenchange'
        } else if ('onmsfullscreenchange' in document) {
            this.fullscreenchangeEventName = 'MSFullscreenChange'
        }
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
        let {interval} = this.props

        if (this.cursor === this.maxCursor) {
            interval = this.props.dwell
        }

        this.timeoutId = window.setTimeout(this.next, interval)
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

        if (this.fullscreenchangeEventName) {
            document.addEventListener(
                this.fullscreenchangeEventName,
                this.handleFullscreenChange
            )
        }
	}
	componentWillUnmount() {
		window.removeEventListener('keydown', this.handleKeyDown)
        this.clearTimeout()

        if (this.fullscreenchangeEventName) {
            document.removeEventListener(
                this.fullscreenchangeEventName,
                this.handleFullscreenChange
            )
        }
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
    handleFullscreenClick = event => {
        this.isFullscreen = !this.isFullscreen
    }
    _container = null
    get container() {
        return this._container
    }
    set container(container) {
        this._container = findDOMNode(container)
    }
    get isFullscreen() {
        return this.state.isFullscreen
    }
    set isFullscreen(isFullscreen) {
        this.setState({isFullscreen}, this.toggleFullscreen)
    }
    toggleFullscreen = () => {
        if (this.isFullscreen) {
            const {container} = this

            if (container.requestFullscreen) {
                container.requestFullscreen()
            } else if (container.mozRequestFullScreen) {
                container.mozRequestFullScreen()
            } else if (container.webkitRequestFullscreen) {
                container.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT)
            } else if (container.msRequestFullscreen) {
                container.msRequestFullscreen()
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen()
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen()
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen()
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen()
            }
        }
    }
    handleFullscreenChange = event => {
        const {container} = this
        const fullscreenElement =
            document.fullscreenElement ||
            document.mozFullScreenElement ||
            document.webkitFullscreenElement ||
            document.msFullscreenElement

        if (fullscreenElement === container && !this.isFullscreen) {
            this.isFullscreen = true
        } else if (fullscreenElement !== container && this.isFullscreen) {
            this.isFullscreen = false
        }
    }
	render() {
        const {isFullscreen} = this
        const {interval} = this.props
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
            <div ref={ref => this.container = ref} className={styles.Container}>
                <Image {...image} />
                <div className={styles.Toolbar}>
                    <ButtonSet {...toolbar} />
                    <div className={styles.Title}>
                        {this.isLoading &&
                            <Delay elapse={interval + 50}>
                                <span>Loading</span>
                            </Delay>
                        }
                        {this.cursor + 1} of {this.maxCursor + 1}
                    </div>
                    <Button
                        icon={FullscreenIcons.get(isFullscreen)}
                        onClick={this.handleFullscreenClick} />
                </div>
            </div>
        )
	}
}
