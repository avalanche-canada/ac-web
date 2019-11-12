import React from 'react'
import PropTypes from 'prop-types'
import Summary from '../Summary'

Confidence.propTypes = {
    level: PropTypes.string,
    children: PropTypes.node,
}

export default function Confidence({ level, children }) {
    if (!level && !children) {
        return null
    }

    return (
        <Summary title="Confidence">
            <dl>
                <dt>{level}</dt>
                <dd>{children}</dd>
            </dl>
        </Summary>
    )
}
