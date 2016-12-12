import React, {PropTypes} from 'react'
import {DateElement} from 'components/misc'
import Section from './Section'
import Loop from '../Loop'
import addDays from 'date-fns/add_days'

Day3to4.propTypes = {
    date: PropTypes.instanceOf(Date).isRequired,
    children: PropTypes.node,
}

function Title({date}) {
    const day3 = addDays(date, 2)
    const day4 = addDays(date, 3)

    return (
        <div>
            <DateElement value={day3} /> and <DateElement value={day4} />
        </div>
    )
}

export default function Day3to4({date, children}) {
    const loop = {
        type: 'AC_GDPS_EPA_6hr-precip-clds-th-slp',
        date: addDays(date, -1),
        run: 12,
        from: 72,
        to: 120,
    }

    return (
        <Section title={<Title date={date} />}>
            {children && <Loop {...loop} />}
            {children}
        </Section>
    )
}
