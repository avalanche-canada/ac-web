import React from 'react'
import {Router, applyRouterMiddleware} from 'react-router'
import {history} from './'
import useScroll from 'react-router-scroll/lib/useScroll'
import computeRoutes from './computeRoutes'

function shouldUpdateScroll(previous, {location: {hash}}) {
    if (!previous) {
        return true
    }

    if (hash) {
        const element = document.querySelector(`a[href="${hash}"]`)

        if (element) {
            const {top} = element.getBoundingClientRect()

            return [0, Math.floor(top + window.pageYOffset) - 75 - 10]
        } else {
            return [0, 0]
        }
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
