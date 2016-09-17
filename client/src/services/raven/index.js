import Raven from 'raven-js'
import {key, project} from './config.json'

Raven.config(`https://${key}@sentry.io/${project}`).install()

export function captureException(exception, context) {
    Raven.captureException(exception, {
        extra: context
    })

    console.error(exception)
}

export function captureMessage(message, context) {
    Raven.captureMessage(message, {
        extra: context
    })
}

export function setUserContext({id, email, username, ip_address}) {
    Raven.setUserContext({
        id,
        email,
        username,
        ip_address
    })
}
