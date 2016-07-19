import React, {PropTypes} from 'react'
import {InnerHTML} from 'components/misc'
import {DateElement, Image} from 'components/misc'
import Section from './Section'
import {formatUrl} from '../Loop'

const {keys} = Object
function description() {
    // TODO: Finish this with parameters
    return 'Weather Systems'
}

Day1.propTypes = {
    date: PropTypes.instanceOf(Date).isRequired,
    above: PropTypes.string.isRequired,
    between: PropTypes.string.isRequired,
    below: PropTypes.string.isRequired,
    children: PropTypes.element,
}

export default function Day1({date, above, between, below, children}) {
    const hasHardWired = above || between || below
    const title = <DateElement value={date} />
    const type = 'AC_RDPS_BC_weather-systems'
    const image1 = {
        src: formatUrl({date, type, run: 6, hour: 6}),
        alt: description(),
        title: description(),
    }
    const image2 = {
        src: formatUrl({date, type, run: 6, hour: 18}),
        alt: description(),
        title: description(),
    }

    return (
        <Section title={title}>
            {hasHardWired && <InnerHTML>{above}</InnerHTML>}
            {hasHardWired && <Image {...image1} openNewTab />}
            {hasHardWired && <InnerHTML>{between}</InnerHTML>}
            {hasHardWired && <Image {...image2} openNewTab />}
            {hasHardWired && <InnerHTML>{below}</InnerHTML>}
            {children}
        </Section>
    )
}
