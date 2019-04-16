import { useEffect } from 'react'
import PropTypes from 'prop-types'

ScrollTo.propTypes = {
    location: PropTypes.object.isRequired,
    children: PropTypes.element.isRequired,
    x: PropTypes.number,
    y: PropTypes.number,
}

export default function ScrollTo({ location, children, x = 0, y = 0 }) {
    useEffect(() => {
        requestAnimationFrame(() => {
            window.scrollTo(x, y)
        })
        // Needs to change on "pathname" and not on "href" change. Example: glossary links between terms will not work!
    }, [location.pathname])

    return children
}
