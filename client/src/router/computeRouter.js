import React from 'react'
import {Router} from 'react-router'
import {history} from './'
import computeRoutes from './computeRoutes'
// import useScroll from 'react-router-scroll'
export default function computeRouter(store) {
    // render={applyRouterMiddleware(useScroll())}
    return (
        <Router history={history}>
            {computeRoutes(store)}
        </Router>
    )
}
