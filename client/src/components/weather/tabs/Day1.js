import React, {PropTypes} from 'react'
import {Html} from 'prismic'
import {DateElement} from 'components/misc'
import {Section} from 'components/page'
import SliceSet from './SliceSet'
import Loop from '../Loop'

Day1.propTypes = {
    group: PropTypes.object.isRequired,
    slices: PropTypes.object.isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
}

export default function Day1({group, slices, date}) {
    const hasHardWired = group.fragments.length > 0

    return (
        <Section title={<DateElement value={date} />} level={3}>
            {hasHardWired && <Html document={group} fragment='above' />}
            {hasHardWired && <Loop type='AC_RDPS_BC_weather-systems' date={date} />}
            {hasHardWired && <Html document={group} fragment='between' />}
            {hasHardWired && <Loop type='AC_GDPS_EPA_clouds-th-500hts' date={date} />}
            {hasHardWired && <Html document={group} fragment='below' />}
            <SliceSet slices={slices} />
        </Section>
    )
}
