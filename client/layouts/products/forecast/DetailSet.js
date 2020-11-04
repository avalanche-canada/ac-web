import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { useIntl } from 'react-intl'
import { InnerHTML } from 'components/misc'
import Summary from './Summary'

DetailSet.propTypes = {
    avalanche: PropTypes.string,
    snowpack: PropTypes.string,
    weather: PropTypes.string,
}

export default function DetailSet({ avalanche, snowpack, weather }) {
    const intl = useIntl()

    return (
        <Fragment>
            <Section
                title={intl.formatMessage({
                    description: 'Avalanche Details section',
                    defaultMessage: 'Avalanche Summary',
                })}
                value={avalanche}
            />
            <Section
                title={intl.formatMessage({
                    description: 'Avalanche Details section',
                    defaultMessage: 'Snowpack Summary',
                })}
                value={snowpack}
            />
            <Section
                title={intl.formatMessage({
                    description: 'Avalanche Details section',
                    defaultMessage: 'Weather Forecast',
                })}
                value={weather}
            />
        </Fragment>
    )
}

// Components
Section.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.string,
    children: PropTypes.node,
}

function Section({ title, value }) {
    if (!value || value.replace(HTML_REGEX, '').trim() === '') {
        return null
    }

    return (
        <Summary title={title}>
            <InnerHTML>{value}</InnerHTML>
        </Summary>
    )
}

// Constants
const HTML_REGEX = /<(?:.|\n)*?>/gm
