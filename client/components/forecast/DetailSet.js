import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { InnerHTML } from 'components/misc'
import Summary from './Summary'

const HTML_REGEX = /<(?:.|\n)*?>/gm

Section.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.string,
    children: PropTypes.node,
}

function Section({ title, value, children }) {
    if (!value || value.replace(HTML_REGEX, '').trim() === '') {
        return children || null
    }

    return (
        <Summary title={title}>
            <InnerHTML>{value}</InnerHTML>
            {children}
        </Summary>
    )
}

DetailSet.propTypes = {
    avalanche: PropTypes.string,
    snowpack: PropTypes.string,
    weather: PropTypes.string,
}

export default function DetailSet({ avalanche, snowpack, weather }) {
    return (
        <div>
            <Section title="Avalanche Summary" value={avalanche} />
            <Section title="Snowpack Summary" value={snowpack} />
            <Section title="Weather Forecast" value={weather}>
                <p>
                    More details can be found on the{' '}
                    <Link to="/weather">Mountain Weather Forecast</Link>
                    .
                </p>
            </Section>
        </div>
    )
}
