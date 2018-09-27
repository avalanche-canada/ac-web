import Raven from 'raven-js'
import supported from '@mapbox/mapbox-gl-supported'
import { key, project } from './config.json'

export default function setup() {
    if (Raven.isSetup()) {
        return
    }

    if (process.env.NODE_ENV === 'production') {
        Raven.config(`https://${key}@sentry.io/${project}`, {
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

export function setUserContext({ user_id, email, name }) {
    if (Raven.isSetup()) {
        Raven.setUserContext({
            id: user_id,
            email,
            username: name,
        })
    }
}
