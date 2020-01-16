import React, { lazy } from 'react'
import Bundle from 'components/Bundle'
import { Loading } from 'layouts/pages'

const Layout = lazy(() => import('./layout'))

export default function Tutorial(props) {
    return (
        <Bundle fallback={<Loading />}>
            <Layout {...props} />
        </Bundle>
    )
}
