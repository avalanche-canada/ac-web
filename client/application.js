import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { Router } from '@reach/router'
import { AvalancheCanada, AvalancheCanadaFoundation } from 'layouts'
import ScrollTo from 'components/ScrollTo'
import { Boundary as ErrorBoundary } from 'components/error'
import Analytics from 'services/analytics'
import { Fallback } from 'layouts/pages'
import { LocationProvider } from 'router/hooks'
import Navbar from 'components/navbar'

import 'styles'

export default function application() {
    ReactDOM.render(
        <ErrorBoundary fallback={<Fallback navbar={<Navbar />} />}>
            <LocationProvider>
                <StrictMode>
                    <Analytics>
                        <ScrollTo>
                            <Router primary={false}>
                                <AvalancheCanada path="/*" />
                                <AvalancheCanadaFoundation path="foundation/*" />
                            </Router>
                        </ScrollTo>
                    </Analytics>
                </StrictMode>
            </LocationProvider>
        </ErrorBoundary>,
        document.getElementById('app')
    )
}
