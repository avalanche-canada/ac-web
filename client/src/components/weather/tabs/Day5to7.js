import React from 'react'
import PropTypes from 'prop-types'
import {DateElement} from '/components/misc'
import Section from './Section'
import Loop from '../Loop'
import addDays from 'date-fns/add_days'

Day5To7.propTypes = {
    date: PropTypes.instanceOf(Date).isRequired,
    children: PropTypes.node,
}

function Title({date}) {
    const day5 = addDays(date, 4)
    const day7 = addDays(date, 6)

    return (
        <div>
            <DateElement value={day5} /> to <DateElement value={day7} />
        </div>
    )
}

export default function Day5To7({date, above, between, below, children}) {
    const loop = {
        type: 'AC_GDPS_EPA_6hr-precip-clds-th-slp',
        date: addDays(date, -1),
        run: 12,
        from: 120,
        to: 144,
    }

    return (
        <Section title={<Title date={date} />}>
            {children && <Loop {...loop} />}
            {children}
        </Section>
    )
}
