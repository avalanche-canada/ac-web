import throttle from 'lodash/throttle'
import {mapWidthChanged} from 'actions/map'

let configure = null

if (process.env.NODE_ENV === 'production') {
    configure = require('./configure/prod')
} else {
    configure = require('./configure/dev')
}

export default function(...args) {
    const store = configure.default(...args)
    const dispatchMapWidthChanged = throttle(() => {
        store.dispatch(mapWidthChanged(window.innerWidth))
    }, 250)

    window.addEventListener('resize', dispatchMapWidthChanged, false)
    window.addEventListener('orientationchange', dispatchMapWidthChanged, false)

    return store
}
