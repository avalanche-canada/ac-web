import React from 'react'
import PropTypes from 'prop-types'
import { memo } from 'utils/react'
import Summary from '../Summary'

Confidence.propTypes = {
    level: PropTypes.string.isRequired,
    comment: PropTypes.string.isRequired,
}

function Confidence({ level, comment }) {
    return (
        <Summary title="Confidence">
            <dl>
                <dt>{level}</dt>
                <dd>{comment}</dd>
            </dl>
        </Summary>
    )
}

export default memo.static(Confidence)
