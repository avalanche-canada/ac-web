import React from 'react'
import PropTypes from 'prop-types'
import Summary from '../Summary'

Confidence.propTypes = {
    level: PropTypes.string.isRequired,
    comment: PropTypes.string.isRequired,
}

export default function Confidence({ level, comment }) {
    return (
        <Summary title="Confidence">
            <dl>
                <dt>{level}</dt>
                <dd>{comment}</dd>
            </dl>
        </Summary>
    )
}
