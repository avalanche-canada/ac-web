import Raven from 'raven-js'
import {key, project} from './config.json'

Raven.config(`https://${key}@sentry.io/${project}`).install()

export function captureException(exception, context) {
    Raven.captureException(exception, context)

    console.error(exception)
}

export function captureMessage(message, context) {
    Raven.captureMessage(message, context)
}

export function setUserContext({user_id, email, name}) {
    Raven.setUserContext({
        id: user_id,
        email,
        username: name,
    })
}
