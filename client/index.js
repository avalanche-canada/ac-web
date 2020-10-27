import polyfills from 'polyfills'
import application from 'application'
import { supported } from 'utils/mapbox'
import init from 'services/sentry'

init(supported())

index(window)

async function index(self) {
    await polyfills(self)

    application()
}
