import React from 'react'
import {Router, applyRouterMiddleware} from 'react-router'
import {history} from './'
import useScroll from 'react-router-scroll/lib/useScroll'
import computeRoutes from './computeRoutes'
import {scrollPosition} from 'utils/dom'

function shouldUpdateScroll(previous, {location: {hash}}) {
    if (!previous) {
        return true
    }

    if (hash) {
        return scrollPosition(hash) || [0, 0]
    }

    return true
}

export default function computeRouter(store) {
    return (
        <Router history={history} render={applyRouterMiddleware(useScroll(shouldUpdateScroll))}>
            {computeRoutes(store)}
        </Router>
    )
}
