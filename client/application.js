import React, { StrictMode, lazy } from 'react'
import ReactDOM from 'react-dom'
import { Router } from '@reach/router'
import { Provider as IntlProvider } from 'contexts/intl'
import { AvalancheCanada, AvalancheCanadaFoundation } from 'layouts'
import ScrollTo from 'components/ScrollTo'
import { Boundary as ErrorBoundary } from 'components/error'
import Analytics from 'services/analytics'
import { Fallback } from 'layouts/pages'
import { LocationProvider } from 'router/hooks'
import Bundle from 'components/Bundle'
import Navbar from 'components/navbar'

import 'styles'

export default function application() {
    ReactDOM.render(
        <IntlProvider>
            <ErrorBoundary fallback={<Fallback navbar={<Navbar />} />}>
                <LocationProvider>
                    <StrictMode>
                        <Analytics>
                            <ScrollTo>
                                <Router primary={false}>
                                    <AvalancheCanada path="/*" />
                                    <AvalancheCanadaFoundation path="foundation/*" />
                                </Router>
                                {Boolean(process.env.REACT_APP_SHOW_NOT_PRODUCTION_WARNING) && (
                                    <Bundle>
                                        <NotProductionWarning />
                                    </Bundle>
                                )}
                            </ScrollTo>
                        </Analytics>
                    </StrictMode>
                </LocationProvider>
            </ErrorBoundary>
        </IntlProvider>,
        document.getElementById('app')
    )
}

const NotProductionWarning = lazy(() => import('layouts/NotProductionWarning'))
