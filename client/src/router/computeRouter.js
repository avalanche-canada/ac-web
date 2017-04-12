import React from 'react'
import {Router, applyRouterMiddleware} from 'react-router'
import {history} from './'
import useScroll from 'react-router-scroll/lib/useScroll'
import computeRoutes from './computeRoutes'
import {scrollPosition} from '/utils/dom'

function shouldUpdateScroll(previous, next) {
    if (!previous) {
        return true
    }

    const {location: {hash, pathname}} = next

    if (hash) {
        return scrollPosition(hash) || [0, 0]
    }

    return pathname !== previous.location.pathname
}

function computeRouter(store) {
    return (
        <Router history={history} render={applyRouterMiddleware(useScroll(shouldUpdateScroll))}>
            {computeRoutes(store)}
        </Router>
    )
}

export default computeRouter
