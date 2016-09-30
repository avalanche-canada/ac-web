import Raven from 'raven-js'
import {key, project} from './config.json'

export default function setup() {
    if (Raven.isSetup()) {
        return
    }

    if (process.env.NODE_ENV === 'production') {
        Raven.config(`https://${key}@sentry.io/${project}`).install()
    }
}

export function captureException(exception, context) {
    if (Raven.isSetup()) {
        Raven.captureException(exception, context)
    }

    console.error(exception)
}

export function captureMessage(message, context) {
    if (Raven.isSetup()) {
        Raven.captureMessage(message, context)
    }
}

export function setUserContext({user_id, email, name}) {
    if (Raven.isSetup()) {
        Raven.setUserContext({
            id: user_id,
            email,
            username: name,
        })
    }
}
