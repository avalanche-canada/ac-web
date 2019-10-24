import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useLocation } from 'router/hooks'

ScrollTo.propTypes = {
    children: PropTypes.element.isRequired,
    x: PropTypes.number,
    y: PropTypes.number,
}

export default function ScrollTo({ children, x = 0, y = 0 }) {
    const { location } = useLocation()
    useEffect(() => {
        requestAnimationFrame(() => {
            window.scrollTo(x, y)
        })
        // Needs to change on "pathname" and not on "href" change.
        // Example: glossary links between terms will not work!
    }, [location.pathname])

    return children
}
