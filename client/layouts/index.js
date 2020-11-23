import React, { lazy } from 'react'
import Bundle from 'components/Bundle'
import AvalancheCanada from './AvalancheCanada'

export { AvalancheCanada }

const LazyAvalancheCanadaFoundation = lazy(() =>
    import('./AvalancheCanadaFoundation')
)

export function AvalancheCanadaFoundation() {
    return (
        <Bundle fallback={null}>
            <LazyAvalancheCanadaFoundation />
        </Bundle>
    )
}
