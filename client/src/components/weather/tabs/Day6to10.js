import React, {PropTypes} from 'react'
import Section from './Section'
import SliceSet from './SliceSet'
import Loop from '../Loop'

Day6to10.propTypes = {
    slices: PropTypes.object.isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
}

export default function Day6to10({slices, date}) {
    return (
        <Section>
            <SliceSet slices={slices} />
        </Section>
    )
}
