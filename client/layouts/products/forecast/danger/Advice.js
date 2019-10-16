import React from 'react'
import PropTypes from 'prop-types'
import Summary from '../Summary'
import {InnerHTML} from 'components/misc'

Advice.propTypes = {
    children: PropTypes.string.isRequired,
}

export default function Advice({ children }) {
    return (
        <Summary title="Travel and Terrain Advice">
            <InnerHTML>{children}</InnerHTML>
        </Summary>
    )
}
