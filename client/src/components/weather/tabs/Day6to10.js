import React, {PropTypes} from 'react'
import {Html} from 'prismic'
import SliceSet from './SliceSet'
import Loop from '../Loop'

Day6to10.propTypes = {
    group: PropTypes.object.isRequired,
    slices: PropTypes.object.isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
}

export default function Day6to10({group, slices, date}) {
    return (
        <section>
            <SliceSet slices={slices} />
        </section>
    )
}
