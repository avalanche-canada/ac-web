import React from 'react'
import PropTypes from 'prop-types'
import Summary from '../Summary'

Confidence.propTypes = {
    level: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
}

export default function Confidence({ level, children }) {
    return (
        <Summary title="Confidence">
            <dl>
                <dt>{level}</dt>
                <dd>{children}</dd>
            </dl>
        </Summary>
    )
}
