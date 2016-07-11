import React, {PropTypes} from 'react'
import {Html} from 'prismic'
import {DateElement, Image} from 'components/misc'
import Section from './Section'
import SliceSet from './SliceSet'
import {formatLoop as format} from '../utils/Url'

const {keys} = Object
function description() {
    return 'Weather Systems'
}

Day1.propTypes = {
    group: PropTypes.object.isRequired,
    slices: PropTypes.object.isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
}

export default function Day1({group, slices, date}) {
    const hasHardWired = keys(group.fragments).length > 0
    const title = <DateElement value={date} />
    const type = 'AC_RDPS_BC_weather-systems'
    const image1 = {
        src: format({date, type, run: 6, hour: 6}),
        alt: description(),
        title: description(),
    }
    const image2 = {
        src: format({date, type, run: 6, hour: 18}),
        alt: description(),
        title: description(),
    }

    return (
        <Section title={title}>
            {hasHardWired && <Html document={group} fragment='above' />}
            {hasHardWired && <Image {...image1} openNewTab />}
            {hasHardWired && <Html document={group} fragment='between' />}
            {hasHardWired && <Image {...image2} openNewTab />}
            {hasHardWired && <Html document={group} fragment='below' />}
            <SliceSet slices={slices} />
        </Section>
    )
}
