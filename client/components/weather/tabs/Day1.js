import React from 'react'
import PropTypes from 'prop-types'
import { DateElement } from '~/components/misc'
import { StructuredText, InlineImage } from '~/prismic/components/base'
import Section from './Section'
import { formatForecastUrl } from '~/services/msc/loop/url'

Day1.propTypes = {
    date: PropTypes.instanceOf(Date).isRequired,
    above: PropTypes.string.isRequired,
    between: PropTypes.string.isRequired,
    below: PropTypes.string.isRequired,
    children: PropTypes.node,
}

export default function Day1({ date, above, between, below, children }) {
    const hasHardWired = above || between || below
    const type = 'AC_RDPS_BC_weather-systems'
    const alt = 'Weather Systems'
    const title = 'Weather Systems'
    const image1 = {
        alt,
        title,
        src: formatForecastUrl(type, date, 6, 6),
    }
    const image2 = {
        alt,
        title,
        src: formatForecastUrl(type, date, 6, 18),
    }

    return (
        <Section title={<DateElement value={date} />}>
            {hasHardWired && <StructuredText {...above} />}
            {hasHardWired && <InlineImage {...image1} openNewTab />}
            {hasHardWired && <StructuredText {...between} />}
            {hasHardWired && <InlineImage {...image2} openNewTab />}
            {hasHardWired && <StructuredText {...below} />}
            {children}
        </Section>
    )
}
