import React from 'react'
import PropTypes from 'prop-types'
import Summary from '../Summary'

Advice.propTypes = {
    children: PropTypes.string.isRequired,
}

export default function Advice({ children }) {
    return <Summary title="Travel and Terrain Advice">{children}</Summary>
}
