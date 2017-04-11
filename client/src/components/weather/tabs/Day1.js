import React from 'react'
import PropTypes from 'prop-types'
import {InnerHTML} from '/components/misc'
import {DateElement, Image} from '/components/misc'
import Section from './Section'
import {formatForecastUrl} from '/services/msc/loop/url'

Day1.propTypes = {
    date: PropTypes.instanceOf(Date).isRequired,
    above: PropTypes.string.isRequired,
    between: PropTypes.string.isRequired,
    below: PropTypes.string.isRequired,
    children: PropTypes.node,
}

export default function Day1({date, above, between, below, children}) {
    const hasHardWired = above || between || below
    const type = 'AC_RDPS_BC_weather-systems'
    const image = {
        alt: 'Weather Systems',
        title: 'Weather Systems',
    }
    const image1 = {
        ...image,
        src: formatForecastUrl(type, date, 6, 6),
    }
    const image2 = {
        ...image,
        src: formatForecastUrl(type, date, 6, 18),
    }

    return (
        <Section title={<DateElement value={date} />}>
            {hasHardWired && <InnerHTML>{above}</InnerHTML>}
            {hasHardWired && <Image {...image1} openNewTab />}
            {hasHardWired && <InnerHTML>{between}</InnerHTML>}
            {hasHardWired && <Image {...image2} openNewTab />}
            {hasHardWired && <InnerHTML>{below}</InnerHTML>}
            {children}
        </Section>
    )
}
