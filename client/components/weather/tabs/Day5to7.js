import React from 'react'
import PropTypes from 'prop-types'
import { Range } from 'components/time'
import Section from './Section'
import addDays from 'date-fns/add_days'
import ExtendedWeatherForecast from './ExtendedWeatherForecast'

Day5to7.propTypes = {
    date: PropTypes.instanceOf(Date).isRequired,
    children: PropTypes.node,
}

Title.propTypes = {
    date: PropTypes.instanceOf(Date).isRequired,
}

function Title({ date }) {
    const from = addDays(date, 4)
    const to = addDays(date, 7)

    return <Range from={from} to={to} />
}

export default function Day5to7({ date, children }) {
    return (
        <Section title={<Title date={date} />}>
            {children}
            <ExtendedWeatherForecast date={date} />
        </Section>
    )
}
