import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useEventListener } from 'hooks'
import { useLocation } from './hooks'

FragmentIdentifier.propTypes = {
    hash: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
}

export default function FragmentIdentifier({ hash, children, ...rest }) {
    const { location } = useLocation()
    const href = '#' + hash
    const anchor = useRef()
    function scroll() {
        if (window.location.hash === href) {
            anchor.current.scrollIntoView(true)

            const { scrollY } = window

            if (scrollY) {
                setTimeout(() => {
                    window.scroll(0, scrollY - 90) // Magic number: navbar height!
                })
            }
        }
    }

    useEventListener('hashchange', scroll)
    useEffect(scroll, [location.hash])

    return (
        <a ref={anchor} name={hash} href={href} {...rest}>
            {children}
        </a>
    )
}
