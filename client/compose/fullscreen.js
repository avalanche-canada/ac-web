import { compose, lifecycle, withState, withHandlers } from 'recompose'

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

// const ENABLED = Boolean(
//     document.fullscreenEnabled ||
//         document.mozFullscreenEnabled ||
//         document.msFullscreenEnabled ||
//         document.webkitFullscreenEnabled
// )

export default compose(
    withState(
        'isFullscreen',
        'setFullscreen',
        props => props.isFullscreen || false
    ),
    withState('container', 'setFullscreenContainer'),
    withHandlers({
        enterFullscreen: props => () => {
            const { container, setFullscreen } = props

            setFullscreen(true)

            if (container.requestFullscreen) {
                container.requestFullscreen()
            } else if (container.mozRequestFullScreen) {
                container.mozRequestFullScreen()
            } else if (container.webkitRequestFullscreen) {
                container.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT)
            } else if (container.msRequestFullscreen) {
                container.msRequestFullscreen()
            }
        },
        exitFullscreen: props => () => {
            props.setFullscreen(false)

            if (document.exitFullscreen) {
                document.exitFullscreen()
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen()
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen()
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen()
            }
        },
        toggleFullscreen: props => () => {
            if (props.isFullscreen) {
                props.exitFullscreen()
            } else {
                props.enterFullscreen()
            }
        },
    }),
    withHandlers({
        handleFullscreenChange: props => () => {
            const { container, isFullscreen } = props
            const fullscreenElement =
                document.fullscreenElement ||
                document.mozFullScreenElement ||
                document.webkitFullscreenElement ||
                document.msFullscreenElement

            if (fullscreenElement === container && !isFullscreen) {
                props.enterFullscreen()
            } else if (fullscreenElement !== container && isFullscreen) {
                props.exitFullscreen()
            }
        },
    }),
    lifecycle({
        componentDidMount() {
            if (CHANGE_EVENT_NAME) {
                document.addEventListener(
                    CHANGE_EVENT_NAME,
                    this.props.handleFullscreenChange
                )
            }
        },
        componentWillUnmount() {
            if (CHANGE_EVENT_NAME) {
                document.removeEventListener(
                    CHANGE_EVENT_NAME,
                    this.props.handleFullscreenChange
                )
            }
        },
    })
)
