import React, { lazy } from 'react'
import { Router } from '@reach/router'
import Bundle from 'components/Bundle'
import { Loading } from 'layouts/pages'

export default function Admin() {
    return (
        <Bundle fallback={<Loading />}>
            <Router>
                <UserList path="users" />
            </Router>
        </Bundle>
    )
}

const UserList = lazy(() => import('./UserList'))
