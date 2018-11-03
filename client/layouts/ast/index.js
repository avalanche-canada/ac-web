import React, { lazy } from 'react'
import Bundle from 'components/Bundle'

const AstLayout = lazy(() => import('./layouts'))

export default function Layout() {
    return (
        <Bundle>
            <AstLayout />
        </Bundle>
    )
}
