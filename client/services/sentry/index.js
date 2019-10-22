/* eslint-disable no-undef */
/* eslint-disable no-console */

import { supported } from 'utils/mapbox'

withScope(scope => {
    scope.setExtra('mapboxgl.supported', supported())
})

export function captureException(error, context) {
    withScope(scope => {
        scope.setExtras(context)
        Sentry.captureException(error)

        console.error(error, context)
    })
}

export function setUserContext({ user_id, email, name }) {
    withScope(scope => {
        scope.setUser({
            id: user_id,
            email,
            username: name,
        })
    })
}

// Fallback functions
function withScope(callback) {
    window?.Sentry?.withScope.apply(Sentry, callback)
}
