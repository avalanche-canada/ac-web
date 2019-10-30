/* eslint-disable no-undef */
/* eslint-disable no-console */

export default function init(mapboxglSupported) {
    Sentry.init({
        dsn: 'https://3988f0f0f90f494cac5a2dbe256a5f2e@sentry.io/99286',
    })

    if (typeof mapboxglSupported === 'boolean') {
        Sentry.withScope(scope => {
            scope.setExtra('mapboxgl.supported', mapboxglSupported)
        })
    }
}

export function captureException(error, context) {
    Sentry.withScope(scope => {
        scope.setExtras(context)
        Sentry.captureException(error)

        console.error(error, context)
    })
}

export function setUserContext({ user_id, email, name }) {
    Sentry.withScope(scope => {
        scope.setUser({
            id: user_id,
            email,
            username: name,
        })
    })
}

export function captureMessage(message) {
    Sentry.captureMessage(message)
}
