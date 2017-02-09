import Raven from 'raven-js'
import Immutable from 'immutable'
import {key, project} from './config.json'
import mapbox from 'services/mapbox/map'

const exceptions = new Set()

export default function setup() {
    if (Raven.isSetup()) {
        return
    }

    if (process.env.NODE_ENV === 'production') {
        Raven.config(`https://${key}@sentry.io/${project}`, {
            shouldSendCallback({exception = {}}) {
                const key = Immutable.fromJS(exception).hashCode()
                const shouldSend = !exceptions.has(key)

                exceptions.add(key)

                // 1 minute
                setTimeout(exceptions.delete.bind(exceptions, key), 60 * 1000)

                return shouldSend
            },
            tags: {
                'mapboxgl.supported': mapbox.supported()
            }
        }).install()
    }
}

export function captureException(exception, context) {
    if (!Raven.isSetup()) {
        return
    }

    Raven.captureException(exception, context)

    console.error(exception)
}

export function captureMessage(message, context) {
    if (!Raven.isSetup()) {
        return
    }

    Raven.captureMessage(message, context)
}

export function setUserContext({user_id, email, name}) {
    if (!Raven.isSetup()) {
        return
    }

    Raven.setUserContext({
        id: user_id,
        email,
        username: name,
    })
}
