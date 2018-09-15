import React, { Component } from 'react'
import PropTypes from 'prop-types'
import keycode from 'keycode'
import { Image, Delay, Ratio } from 'components/misc'
import { Fullscreen as Icon } from 'components/icons'
import Fullscreen from 'components/Fullscreen'
import ButtonSet from './ButtonSet'
import Button from 'components/button'
import { WHITE } from 'constants/colors'
import styles from './Loop.css'

export default class Loop extends Component {
    static propTypes = {
        urls: PropTypes.arrayOf(PropTypes.string).isRequired,
        titles: PropTypes.arrayOf(PropTypes.string),
        interval: PropTypes.number,
        dwell: PropTypes.number,
        startAt: PropTypes.number,
        openImageInNewTab: PropTypes.bool,
    }
    static defaultProps = {
        urls: [],
        titles: [],
        interval: 1000,
        dwell: 2000,
        openImageInNewTab: false,
    }
    state = {
        cursor:
            typeof this.props.startAt === 'number'
                ? Math.min(this.props.startAt, this.props.urls.length - 1)
                : 0,
        isPlaying: false,
        isLoading: false,
        target: null,
    }
    get cursor() {
        return this.state.cursor
    }
    set cursor(cursor) {
        this.setState(
            {
                cursor,
                isLoading: true,
            },
            () => {
                if (this.isPlaying && !this.isLoading) {
                    this.setTimeout()
                }
            }
        )
    }
    get isPlaying() {
        return this.state.isPlaying
    }
    set isPlaying(isPlaying) {
        this.clearTimeout()

        this.setState({ isPlaying }, () => {
            if (isPlaying) {
                this.setTimeout(false)
            }
        })
    }
    get isLoading() {
        return this.state.isLoading
    }
    set isLoading(isLoading) {
        this.setState({ isLoading }, () => {
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
    get title() {
        return this.props.titles[this.cursor]
    }
    clearTimeout() {
        window.clearTimeout(this.timeoutId)
    }
    setTimeout(waitForDwellTime = true) {
        let { interval } = this.props

        if (waitForDwellTime && this.cursor === this.maxCursor) {
            interval = interval + this.props.dwell
        }

        this.clearTimeout()
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
                break
            case right:
                this.next()
                break
        }
    }
    handleImageLoad = () => {
        this.isLoading = false
    }
    handleImageError = () => {
        this.isLoading = false
    }
    setTarget = target => this.setState({ target })
    renderer = ({ toggle }) => {
        const { interval } = this.props
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
            <div ref={this.setTarget} className={styles.Container}>
                {this.title && <div className={styles.Title}>{this.title}</div>}
                <div className={styles.Toolbar}>
                    <ButtonSet {...toolbar} />
                    <div className={styles.Info}>
                        {this.isLoading && (
                            <Delay elapse={interval + 50}>
                                <span>Loading</span>
                            </Delay>
                        )}
                        {this.cursor + 1} of {this.maxCursor + 1}
                    </div>
                    <Button onClick={toggle}>
                        <Icon color={WHITE} />
                    </Button>
                </div>
                <Ratio y={956} x={1124}>
                    {(w, h) => (
                        <Image
                            width={w}
                            height={h}
                            {...image}
                            style={{ backroundColor: '#eee' }}
                        />
                    )}
                </Ratio>
            </div>
        )
    }
    render() {
        return (
            <Fullscreen target={this.state.target}>{this.renderer}</Fullscreen>
        )
    }
}
