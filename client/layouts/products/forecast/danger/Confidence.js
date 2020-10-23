import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import Summary from '../Summary'

Confidence.propTypes = {
    level: PropTypes.string,
    children: PropTypes.node,
}

export default function Confidence({ level, children }) {
    if (!level && !children) {
        return null
    }

    const title = (
        <dl>
            <dt>
                <FormattedMessage defaultMessage="Confidence" />
            </dt>
            <dd>{level}</dd>
        </dl>
    )

    return <Summary title={title}>{children}</Summary>
}
