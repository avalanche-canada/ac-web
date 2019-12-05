import React, { lazy } from 'react'
import { supported } from 'utils/mapbox'
import Bundle from 'components/Bundle'
import { Loading } from 'layouts/pages'
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
