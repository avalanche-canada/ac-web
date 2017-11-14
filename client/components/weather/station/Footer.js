import React from 'react'
import PropTypes from 'prop-types'
import { Generic } from 'prismic/components'

Footer.propTypes = {
    children: PropTypes.node.isRequired,
}

export default function Footer({ children }) {
    return (
        <footer>
            <Generic uid="weather-station-disclaimer" />
            {children}
        </footer>
    )
}
