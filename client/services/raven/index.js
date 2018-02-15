import Raven from 'raven-js'
import Immutable from 'immutable'
import supported from '@mapbox/mapbox-gl-supported'
import { key, project } from './config.json'

const exceptions = new Set()

export default function setup() {
    if (Raven.isSetup()) {
        return
    }

    if (process.env.NODE_ENV === 'production') {
        Raven.config(`https://${key}@sentry.io/${project}`, {
            shouldSendCallback({ exception = {} }) {
                const key = Immutable.fromJS(exception).hashCode()
                const shouldSend = !exceptions.has(key)

                exceptions.add(key)

                // 1 minute
                setTimeout(() => {
                    exceptions.delete(key)
                }, 60 * 1000)

                return shouldSend
            },
            tags: {
                'mapboxgl.supported': supported(),
            },
        }).install()
    }
}

export function captureException(error, context) {
    if (Raven.isSetup()) {
        Raven.captureException(error, context)
    }

    /* eslint-disable no-console */
    console.error(error, context)
    /* eslint-disable no-console */
}

export function captureMessage(message, context) {
    if (Raven.isSetup()) {
        Raven.captureMessage(message, context)
    }
}

export function setUserContext({ user_id, email, name }) {
    if (Raven.isSetup()) {
        Raven.setUserContext({
            id: user_id,
            email,
            username: name,
        })
    }
}
