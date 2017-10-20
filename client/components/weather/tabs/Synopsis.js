import React from 'react'
import PropTypes from 'prop-types'
import { StructuredText } from 'prismic/components/base'
import Section from './Section'
import Loop from '../Loop'

Synopsis.propTypes = {
    date: PropTypes.instanceOf(Date).isRequired,
    above: PropTypes.string.isRequired,
    below: PropTypes.string.isRequired,
    children: PropTypes.node,
}

export default function Synopsis({ date, above, below, children }) {
    return (
        <Section>
            <StructuredText value={above} />
            <Loop type="AC_GDPS_EPA_clds-th-500hts" date={date} run={0} />
            <StructuredText value={below} />
            {children}
        </Section>
    )
}
