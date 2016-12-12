import React, {PropTypes} from 'react'
import {InnerHTML} from 'components/misc'
import {DateElement, Image} from 'components/misc'
import Section from './Section'
import {formatForecastUrl} from 'services/msc/loop/url'
import addDays from 'date-fns/add_days'

Day2.propTypes = {
    date: PropTypes.instanceOf(Date).isRequired,
    above: PropTypes.string.isRequired,
    between: PropTypes.string.isRequired,
    below: PropTypes.string.isRequired,
    children: PropTypes.node,
}

export default function Day2({date, above, between, below, children}) {
    const hasHardWired = above || between || below
    const type = 'AC_RDPS_BC_weather-systems'
    // TODO: Create a "title" and a "alt" that make sense considering the parameters!!!
    const image1 = {
        src: formatForecastUrl(type, date, 6, 30),
        alt: 'Weather Systems',
        title: 'Weather Systems',
    }
    const image2 = {
        src: formatForecastUrl(type, date, 6, 42),
        alt: 'Weather Systems',
        title: 'Weather Systems',
    }

    return (
        <Section title={<DateElement value={addDays(date, 1)} />}>
            {hasHardWired && <InnerHTML>{above}</InnerHTML>}
            {hasHardWired && <Image openImageInNewTab {...image1} />}
            {hasHardWired && <InnerHTML>{between}</InnerHTML>}
            {hasHardWired && <Image openImageInNewTab {...image2} />}
            {hasHardWired && <InnerHTML>{below}</InnerHTML>}
            {children}
        </Section>
    )
}
