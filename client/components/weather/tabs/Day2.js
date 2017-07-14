import React from 'react'
import PropTypes from 'prop-types'
import { DateElement } from '~/components/misc'
import Section from './Section'
import addDays from 'date-fns/add_days'

Day2.propTypes = {
    date: PropTypes.instanceOf(Date).isRequired,
    children: PropTypes.node,
}

export default function Day2({ date, children }) {
    return (
        <Section title={<DateElement value={addDays(date, 1)} />}>
            {children}
        </Section>
    )
}
