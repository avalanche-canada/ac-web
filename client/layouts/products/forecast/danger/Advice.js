import React from 'react'
import PropTypes from 'prop-types'
import Summary from '../Summary'
import { useIntl } from 'react-intl'

Advice.propTypes = {
    children: PropTypes.string.isRequired,
}

export default function Advice({ children }) {
    const intl = useIntl()
    const title = intl.formatMessage({
        defaultMessage: 'Travel and Terrain Advice',
    })

    return <Summary title={title}>{children}</Summary>
}
