import supported from '@mapbox/mapbox-gl-supported'
import { key, project } from './config.json'

const EXCEPTION_QUEUE = []
const SCOPE_QUEUE = []

let Sentry = {
    captureException(...args) {
        EXCEPTION_QUEUE.push(args)
    },
    configureScope(...args) {
        SCOPE_QUEUE.push(args)
    },
}

if (process.env.NODE_ENV === 'production') {
    requestIdleCallback(() => {
        import('@sentry/browser').then(mod => {
            mod.init({ dsn: `https://${key}@sentry.io/${project}` })

            mod.configureScope(scope => {
                scope.setExtra('mapboxgl.supported', supported())
            })

            for (const scope of SCOPE_QUEUE) {
                mod.configureScope(...scope)
            }

            for (const exception of EXCEPTION_QUEUE) {
                mod.captureException(...exception)
            }

            Sentry = mod
        })
    })
}

export function captureException(error, context) {
    Sentry.captureException(error, context)

    /* eslint-disable no-console */
    console.error(error, context)
    /* eslint-disable no-console */
}

export function setUserContext({ user_id, email, name }) {
    Sentry.configureScope(scope => {
        scope.setUser({
            id: user_id,
            email,
            username: name,
        })
    })
}
