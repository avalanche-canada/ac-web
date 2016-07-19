import React, {PropTypes} from 'react'
import {InnerHTML} from 'components/misc'
import Section from './Section'
import Loop from '../Loop'

Synopsis.propTypes = {
    date: PropTypes.instanceOf(Date).isRequired,
    above: PropTypes.string.isRequired,
    below: PropTypes.string.isRequired,
    children: PropTypes.element,
}

export default function Synopsis({date, above, below, children}) {
    return (
        <Section>
            <InnerHTML>{above}</InnerHTML>
            <Loop type='AC_GDPS_EPA_clouds-th-500hts' date={date} run={12} />
            <InnerHTML>{below}</InnerHTML>
            {children}
        </Section>
    )
}
