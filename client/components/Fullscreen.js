import { Component } from 'react'
import PropTypes from 'prop-types'

let CHANGE_EVENT_NAME = null
if ('onfullscreenchange' in document) {
    CHANGE_EVENT_NAME = 'fullscreenchange'
} else if ('onmozfullscreenchange' in document) {
    CHANGE_EVENT_NAME = 'mozfullscreenchange'
} else if ('onwebkitfullscreenchange' in document) {
    CHANGE_EVENT_NAME = 'webkitfullscreenchange'
} else if ('onmsfullscreenchange' in document) {
    CHANGE_EVENT_NAME = 'MSFullscreenChange'
}

export default class Fullscreen extends Component {
    static propTypes = {
        target: PropTypes.object.isRequired,
        children: PropTypes.func.isRequired,
    }
    state = {
        fullscreen: false,
    }
    set fullscreen(fullscreen) {
        this.setState({ fullscreen })
    }
    get element() {
        return (
            document.fullscreenElement ||
            document.mozFullScreenElement ||
            document.webkitFullscreenElement ||
            document.msFullscreenElement
        )
    }
    get enabled() {
        return Boolean(
            document.fullscreenEnabled ||
                document.mozFullscreenEnabled ||
                document.msFullscreenEnabled ||
                document.webkitFullscreenEnabled
        )
    }
    enter = () => {
        const { target } = this.props

        this.fullscreen = true

        if (target.requestFullscreen) {
            target.requestFullscreen()
        } else if (target.mozRequestFullScreen) {
            target.mozRequestFullScreen()
        } else if (target.webkitRequestFullscreen) {
            target.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT)
        } else if (target.msRequestFullscreen) {
            target.msRequestFullscreen()
        }
    }
    exit = () => {
        this.fullscreen = false

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
    toggle = () => {
        if (this.state.fullscreen) {
            this.exit()
        } else {
            this.enter()
        }
    }
    handleChange = () => {
        const { fullscreen } = this.state
        const { target } = this.props
        const { element } = this

        if (element === target && !fullscreen) {
            this.enter()
        } else if (element !== target && fullscreen) {
            this.exit()
        }
    }
    componentDidMount() {
        if (CHANGE_EVENT_NAME) {
            document.addEventListener(CHANGE_EVENT_NAME, this.handleChange)
        }
    }
    componentWillUnmount() {
        if (CHANGE_EVENT_NAME) {
            document.removeEventListener(CHANGE_EVENT_NAME, this.handleChange)
        }
    }
    render() {
        return this.props.children({
            fullscreen: this.state.fullscreen,
            enter: this.enter,
            exit: this.exit,
            toggle: this.toggle,
        })
    }
}
