import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { Router, Redirect, Location } from '@reach/router'
import { AvalancheCanada, AvalancheCanadaFoundation } from 'layouts'
import ScrollTo from 'components/ScrollTo'
import Analytics from 'services/analytics'

import 'services/sentry'

import 'styles'

render()

async function render() {
    // Import polyfills
    if (!window.fetch) {
        await import('whatwg-fetch')
    }

    if (!window.requestAnimationFrame) {
        await import('raf/polyfill')
    }

    if (!urlSearchParamsSupported(window)) {
        await import('url-search-params-polyfill')
    }

    ReactDOM.render(
        <Location>
            {({ location }) => (
                <StrictMode>
                    <Analytics location={location}>
                        <ScrollTo location={location}>
                            <Router primary={false}>
                                <CAC path="cac" />
                                <AvalancheCanada path="/*" />
                                <AvalancheCanadaFoundation path="foundation/*" />
                            </Router>
                        </ScrollTo>
                    </Analytics>
                </StrictMode>
            )}
        </Location>,
        document.getElementById('app')
    )
}

// Subroutes
function CAC() {
    return (
        <Router>
            <Redirect from="training/ast/courses" to="training/courses" />
            <Redirect from="training/overview" to="training" />
            <Redirect from="training/online-course" to="tutorial" />
            <Redirect from="/" to="/" />
        </Router>
    )
}

// Utils
// Copied from https://github.com/jerrybendy/url-search-params-polyfill/blob/master/index.js
function urlSearchParamsSupported(self) {
    var nativeURLSearchParams =
            self.URLSearchParams && self.URLSearchParams.prototype.get
                ? self.URLSearchParams
                : null,
        isSupportObjectConstructor =
            nativeURLSearchParams &&
            new nativeURLSearchParams({ a: 1 }).toString() === 'a=1',
        // There is a bug in safari 10.1 (and earlier) that incorrectly decodes `%2B` as an empty space and not a plus.
        decodesPlusesCorrectly =
            nativeURLSearchParams &&
            new nativeURLSearchParams('s=%2B').get('s') === '+',
        // Fix bug in Edge which cannot encode ' &' correctly
        encodesAmpersandsCorrectly = nativeURLSearchParams
            ? (function() {
                  var ampersandTest = new nativeURLSearchParams()
                  ampersandTest.append('s', ' &')
                  return ampersandTest.toString() === 's=+%26'
              })()
            : true

    return (
        nativeURLSearchParams &&
        isSupportObjectConstructor &&
        decodesPlusesCorrectly &&
        encodesAmpersandsCorrectly
    )
}
