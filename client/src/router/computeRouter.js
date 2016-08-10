import React from 'react'
import {Router} from 'react-router'
import {history} from './'
import computeRoutes from './computeRoutes'

export default function computeRouter(store) {
    return (
        <Router history={history} >
            {computeRoutes(store)}
        </Router>
    )
}
