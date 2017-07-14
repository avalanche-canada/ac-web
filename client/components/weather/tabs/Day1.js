import React from 'react'
import PropTypes from 'prop-types'
import { DateElement } from '~/components/misc'
import Section from './Section'

Day1.propTypes = {
    date: PropTypes.instanceOf(Date).isRequired,
    children: PropTypes.node,
}

export default function Day1({ date, children }) {
    return (
        <Section title={<DateElement value={date} />}>
            {children}
        </Section>
    )
}
