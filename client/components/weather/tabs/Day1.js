import React from 'react'
import PropTypes from 'prop-types'
import { DateElement } from '~/components/misc'
import Section from './Section'

Day1.propTypes = {
    date: PropTypes.instanceOf(Date).isRequired,
    children: PropTypes.node,
}

// When weather systems images are created.
// See, SHA = fec1f74c0aa5bc2d65796bc678199cb1701f1fef

export default function Day1({ date, children }) {
    return (
        <Section title={<DateElement value={date} />}>
            {children}
        </Section>
    )
}
