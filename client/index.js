import polyfills from 'polyfills'
import application from 'application'
import { supported } from 'utils/mapbox'
import init from 'services/sentry'
import createIntl from 'services/intl'

init(supported())

index(window)

async function index(self) {
    await polyfills(self)

    const intl = await createIntl(navigator.language)

    application(intl)
}
