import React from 'react'
import PropTypes from 'prop-types'
import { DateElement } from '~/components/time'
import Section from './Section'
import addDays from 'date-fns/add_days'

LongRange.propTypes = {
    date: PropTypes.instanceOf(Date).isRequired,
}

Title.propTypes = {
    date: PropTypes.instanceOf(Date).isRequired,
}

function Title({ date }) {
    const day5 = addDays(date, 4)
    const day7 = addDays(date, 6)

    return (
        <div>
            <DateElement value={day5} /> to <DateElement value={day7} />
        </div>
    )
}

export default function LongRange({ date }) {
    return <Section title={<Title date={date} />} />
}
