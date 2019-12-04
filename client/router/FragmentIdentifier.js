import React, { useRef, useLayoutEffect } from 'react'
import PropTypes from 'prop-types'
import { useLocation } from './hooks'

FragmentIdentifier.propTypes = {
    hash: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
}

// This component handles hash changes that are triggered by the router...
// Because the router does not trigger an "hashchange", this component is quite important
// Regular "hashchange" events are handle by the browser as expected.

export default function FragmentIdentifier({ hash, children, ...rest }) {
    const { location } = useLocation()
    const href = '#' + hash
    const anchor = useRef()

    useLayoutEffect(() => {
        if (location.hash !== href) {
            return
        }

        const { current } = anchor

        current.scrollIntoView()

        // "setTimeout" to make sure it does not intefere with the browser,
        // when it move to a page, tries to find an anchor, does not find it,
        // so scroll position is set to the top of the page.
        // I do not know how to fix that without involving some weird logics with "hashchange" event.
        // To see it in actions, comment out the code,
        // In Chrome (using the navbar),
        //   - go to ambassadors page
        //   - then the main map
        //   - back to ambassadors page to #aleks-klassen
        // Boom! The page will not scroll.
        // 75ms is a magic number ;(
        setTimeout(() => {
            current.scrollIntoView()
        }, 75)
    }, [location.hash, href])

    return (
        <a name={hash} {...rest} ref={anchor} href={href}>
            {children}
        </a>
    )
}
