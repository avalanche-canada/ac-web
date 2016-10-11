import React from 'react'
import {Router, applyRouterMiddleware} from 'react-router'
import {history} from './'
import useScroll from 'react-router-scroll/lib/useScroll'
import computeRoutes from './computeRoutes'

function shouldUpdateScroll(previous, {location}) {
    const {hash, key} = location

    if (hash) {
        setTimeout(() => {
            const element = document.querySelector(`a[href="${hash}"]`)
            const position = this.readPosition(key)

            if (element) {
                element.scrollIntoView(true)
            }
        })
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
