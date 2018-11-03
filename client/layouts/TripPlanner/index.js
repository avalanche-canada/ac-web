import React, { lazy } from 'react'
import supported from '@mapbox/mapbox-gl-supported'
import Bundle from 'components/Bundle'
import { Loading } from 'components/page'
import Unsupported from './Unsupported'

const Layout = lazy(() => import('./Layout'))

export default function TripPlanner() {
    return supported() ? (
        <Bundle fallback={<Loading />}>
            <Layout />
        </Bundle>
    ) : (
        <Unsupported />
    )
}
