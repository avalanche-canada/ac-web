import React, {PropTypes} from 'react'
import {Html} from 'prismic'
import {Section} from 'components/page'
import SliceSet from './SliceSet'
import Loop from '../Loop'

Day3to5.propTypes = {
    slices: PropTypes.object.isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
}

export default function Day3to5({slices, date}) {
    return (
        <Section>
            <SliceSet slices={slices} />
        </Section>
    )
}
