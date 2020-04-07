import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { Router } from '@reach/router'
import { AvalancheCanada, AvalancheCanadaFoundation } from 'layouts'
import ScrollTo from 'components/ScrollTo'
import Dialog, { Footer, Body } from 'components/dialog'
import { Boundary as ErrorBoundary } from 'components/error'
import Analytics from 'services/analytics'
import { Fallback } from 'layouts/pages'
import { LocationProvider } from 'router/hooks'
import Navbar from 'components/navbar'
import Button from 'components/button'
import { useBoolean } from 'hooks'

import 'styles'

export default function application() {
    ReactDOM.render(
        <ErrorBoundary fallback={<Fallback navbar={<Navbar />} />}>
            <LocationProvider>
                <StrictMode>
                    <Analytics>
                        <ScrollTo>
                            <NotProductionWarning></NotProductionWarning>

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

// Constants
function NotProductionWarning() {
    const [open, , close] = useBoolean(true)
    const { hostname } = document.location

    if (!FAKE_WEBSITE_URLS.has(hostname)) {
        return null
    }

    const STYLE = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '2em',
        boxSizing: 'border-box',
        height: '100%',
    }

    return (
        <Dialog open={open}>
            <Body>
                <div style={STYLE}>
                    <h1>This is not the real Avalanche Canada website.</h1>
                    <p className="secondary-big-button" style={{ flex: 1 }}>
                        <a href="https://avalanche.ca">
                            Bring me to avalanche.ca
                        </a>
                    </p>
                </div>
            </Body>
            <Footer>
                <Button chevron="RIGHT" onClick={close}>
                    I know what I am doing
                </Button>
            </Footer>
        </Dialog>
    )
}
const FAKE_WEBSITE_URLS = new Set([
    'qa.avalanche.ca',
    'dev.avalanche.ca',
    // 'localhost',
])
