/* eslint-disable no-undef */
/* eslint-disable no-console */

import { supported } from 'utils/mapbox'

Sentry.init({ dsn: 'https://3988f0f0f90f494cac5a2dbe256a5f2e@sentry.io/99286' })

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
