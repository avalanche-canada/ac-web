import React, {PropTypes} from 'react'
import {Html} from 'prismic'
import Section from './Section'
import SliceSet from './SliceSet'
import Loop from '../Loop'

Synopsis.propTypes = {
    group: PropTypes.object.isRequired,
    slice: PropTypes.object.isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
}

export default function Synopsis({group, slices, date}) {
    return (
        <Section>
            <Html document={group} fragment='above' />
            <Loop type='AC_GDPS_EPA_clouds-th-500hts' date={date} run={12} />
            <Html document={group} fragment='below' />
            <SliceSet slices={slices} />
        </Section>
    )
}
