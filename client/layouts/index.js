import React, { lazy } from 'react'
import Bundle from 'components/Bundle'

const ACF = lazy(() => import('./AvalancheCanadaFoundation'))

export AvalancheCanada from './AvalancheCanada'
export function AvalancheCanadaFoundation() {
    return (
        <Bundle>
            <ACF />
        </Bundle>
    )
}
