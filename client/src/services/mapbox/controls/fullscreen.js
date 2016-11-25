// FIXME: When https://github.com/mapbox/mapbox-gl-js/issues/1824 gets resolved,
// this class will will not be required anymore.

import './fullscreen.css'

const CLASS_NAME = 'mapboxgl-ctrl'
const TITLES = new Map([
    [true, 'Exit Fullscreen'],
    [false, 'Enter Fullscreen'],
])
const ICON_CLASS_NAMES = new Map([
    [true, `${CLASS_NAME}-fullscreen-exit`],
    [false, `${CLASS_NAME}-fullscreen`],
])

export default class FullscreenControl {
    constructor() {
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
    get container() {
        return this._container
    }
    get map() {
        return this._map
    }
    get button() {
        return this._button
    }
    _isFullscreen = false
    get isFullscreen() {
        return this._isFullscreen
    }
    set isFullscreen(isFullscreen) {
        this._isFullscreen = isFullscreen
        this.button.title = TITLES.get(isFullscreen)
        this.button.classList.remove(ICON_CLASS_NAMES.get(!isFullscreen))
        this.button.classList.add(ICON_CLASS_NAMES.get(isFullscreen))
        this.button.setAttribute('aria-label', this.button.title)
    }
    onAdd(map) {
        this._map = map
        this._container = document.createElement('div')

        this._button = document.createElement('button')
        const title = TITLES.get(this.isFullscreen)

        Object.assign(this.button, {
            className: `${CLASS_NAME}-icon ${ICON_CLASS_NAMES.get(false)}`,
            type: 'button',
            title,
        })
        this.button.setAttribute('aria-label', title)
        this.button.addEventListener('click', this.toggleFullscreen)

        this.container.appendChild(this.button)

        Object.assign(this.container, {
            className: `${CLASS_NAME} ${CLASS_NAME}-group`,
        })

        if (this.fullscreenchangeEventName) {
            document.addEventListener(
                this.fullscreenchangeEventName,
                this.handleFullscreenChange
            )
        }

        return this.container
    }
    onRemove() {
        if (this.fullscreenchangeEventName) {
            document.removeEventListener(
                this.fullscreenchangeEventName,
                this.handleFullscreenChange
            )
        }
        this.container.parentNode.removeChild(this.container)
        this._map = undefined
    }
    toggleFullscreen = event => {
        if (this.isFullscreen) {
            if (document.exitFullscreen) {
                document.exitFullscreen()
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen()
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen()
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen()
            }
        } else {
            const container = this.map.getContainer()

            if (container.requestFullscreen) {
                container.requestFullscreen()
            } else if (container.mozRequestFullScreen) {
                container.mozRequestFullScreen()
            } else if (container.webkitRequestFullscreen) {
                container.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT)
            } else if (container.msRequestFullscreen) {
                container.msRequestFullscreen()
            }
        }

        this.isFullscreen = !this.isFullscreen
    }
    handleFullscreenChange = event => {
        const container = this.map.getContainer()
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
}
