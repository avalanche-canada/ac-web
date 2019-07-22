/* eslint-disable no-undef */
/* eslint-disable no-console */

import { supported } from 'utils/mapbox'

Sentry.withScope(scope => {
    scope.setExtra('mapboxgl.supported', supported())
})

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
