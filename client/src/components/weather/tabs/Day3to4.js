import React, {PropTypes} from 'react'
import moment from 'moment'
import {DateElement} from 'components/misc'
import Section from './Section'
import Loop from '../Loop'

Day3to4.propTypes = {
    date: PropTypes.instanceOf(Date).isRequired,
    children: PropTypes.node,
}

export default function Day3to4({date, children}) {
    const day3 = moment(date).add(2, 'day').toDate()
    const day4 = moment(date).add(3, 'day').toDate()
    const title = (
        <div>
            <DateElement value={day3} /> and <DateElement value={day4} />
        </div>
    )
    const loop = {
        type: 'AC_GDPS_EPA_6hr-precip-clds-th-slp',
        run: 12,
        from: 72,
        to: 120,
    }

    return (
        <Section title={title}>
            {children && <Loop {...loop} />}
            {children}
        </Section>
    )
}
