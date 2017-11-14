import React from 'react'
import PropTypes from 'prop-types'
import { DateElement } from 'components/time'
import Section from './Section'
import addDays from 'date-fns/add_days'

Day2.propTypes = {
    date: PropTypes.instanceOf(Date).isRequired,
    children: PropTypes.node,
}

// When weather systems images are created.
// See, SHA = fec1f74c0aa5bc2d65796bc678199cb1701f1fef

export default function Day2({ date, children }) {
    return (
        <Section title={<DateElement value={addDays(date, 1)} />}>
            {children}
        </Section>
    )
}
