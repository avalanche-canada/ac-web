import React, {PropTypes} from 'react'
import {Html} from 'prismic'
import SliceSet from './SliceSet'
import Loop from '../Loop'

Day3to5.propTypes = {
    slices: PropTypes.object.isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
}

export default function Day3to5({group, slices, date}) {
    return (
        <section>
            <Html document={group} fragment='above' />
            <Loop type='AC_GDPS_EPA_clouds-th-500hts' date={date} />
            <Html document={group} fragment='below' />
            <SliceSet slices={slices} />
        </section>
    )
}
