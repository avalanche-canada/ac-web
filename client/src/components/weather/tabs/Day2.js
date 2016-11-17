import React, {PropTypes} from 'react'
import moment from 'moment'
import {InnerHTML} from 'components/misc'
import {DateElement, Image} from 'components/misc'
import Section from './Section'
import {formatUrl} from '../Loop'

function description() {
    // TODO: Finish this with parameters
    return 'Weather Systems'
}

Day2.propTypes = {
    date: PropTypes.instanceOf(Date).isRequired,
    above: PropTypes.string.isRequired,
    between: PropTypes.string.isRequired,
    below: PropTypes.string.isRequired,
    children: PropTypes.node,
}

export default function Day2({date, above, between, below, children}) {
    const hasHardWired = above || between || below
    const day = moment(date).add(1, 'day').toDate()
    const title = <DateElement value={day} />
    const type = 'AC_RDPS_BC_weather-systems'
    const image1 = {
        src: formatUrl({date, type, run: 6, hour: 30}),
        alt: description(),
        title: description(),
    }
    const image2 = {
        src: formatUrl({date, type, run: 6, hour: 42}),
        alt: description(),
        title: description(),
    }

    return (
        <Section title={title}>
            {hasHardWired && <InnerHTML>{above}</InnerHTML>}
            {hasHardWired && <Image openImageInNewTab {...image1} />}
            {hasHardWired && <InnerHTML>{between}</InnerHTML>}
            {hasHardWired && <Image openImageInNewTab {...image2} />}
            {hasHardWired && <InnerHTML>{below}</InnerHTML>}
            {children}
        </Section>
    )
}
