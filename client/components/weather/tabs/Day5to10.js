import React from 'react'
import PropTypes from 'prop-types'
import { DateElement } from '~/components/time'
import Section from './Section'
import addDays from 'date-fns/add_days'

Day5to10.propTypes = {
    date: PropTypes.instanceOf(Date).isRequired,
    children: PropTypes.node,
}

Title.propTypes = {
    date: PropTypes.instanceOf(Date).isRequired,
}

function Title({ date }) {
    const day5 = addDays(date, 4)
    const day10 = addDays(date, 9)

    return (
        <div>
            <DateElement value={day5} /> to <DateElement value={day10} />
        </div>
    )
}

export default function Day5to10({ date, children }) {
    return (
        <Section title={<Title date={date} />}>
            {children}
        </Section>
    )
}
