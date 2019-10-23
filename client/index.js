import polyfills from 'polyfills'
import application from 'application'
import 'services/sentry'

index(window)

async function index(self) {
    await polyfills(self)

    application()
}
