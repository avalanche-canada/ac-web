import React, {PropTypes} from 'react'
import moment from 'moment'
import {Html} from 'prismic'
import {DateElement, Image} from 'components/misc'
import Section from './Section'
import SliceSet from './SliceSet'
import {formatLoop as format} from '../utils/Url'

function description() {
    return 'Weather Systems'
}
const {keys} = Object

Day2.propTypes = {
    group: PropTypes.object.isRequired,
    slices: PropTypes.object.isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
}

export default function Day2({group, slices, date}) {
    const hasHardWired = keys(group.fragments).length > 0
    const day = moment(date).add(1, 'day').toDate()
    const title = <DateElement value={day} />
    const type = 'AC_RDPS_BC_weather-systems'
    const image1 = {
        src: format({date, type, run: 6, hour: 30}),
        alt: description(),
        title: description(),
    }
    const image2 = {
        src: format({date, type, run: 6, hour: 42}),
        alt: description(),
        title: description(),
    }

    return (
        <Section title={title}>
            {hasHardWired && <Html document={group} fragment='above' />}
            {hasHardWired && <Image openImageInNewTab {...image1} />}
            {hasHardWired && <Html document={group} fragment='between' />}
            {hasHardWired && <Image openImageInNewTab {...image2} />}
            {hasHardWired && <Html document={group} fragment='below' />}
            <SliceSet slices={slices} />
        </Section>
    )
}
