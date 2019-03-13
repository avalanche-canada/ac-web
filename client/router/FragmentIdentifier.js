import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Location } from '@reach/router'

FragmentIdentifier.propTypes = {
    hash: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
}

export default function FragmentIdentifier(props) {
    return (
        <Location>
            {({ location }) => (
                <FragmentIdentifierWithLocation
                    location={location}
                    {...props}
                />
            )}
        </Location>
    )
}

function FragmentIdentifierWithLocation(props) {
    const { location, hash, children, ...rest } = props
    const href = `#${hash}`
    const anchor = useRef()
    function scroll() {
        if (window.location.hash === href) {
            anchor.current.scrollIntoView()
        }
    }

    useEffect(() => {
        window.addEventListener('hashchange', scroll)

        scroll()

        return () => {
            window.removeEventListener('hashchange', scroll)
        }
    }, [])

    useEffect(scroll, [location.hash])

    return (
        <a ref={anchor} name={hash} href={href} {...rest}>
            {children}
        </a>
    )
}
