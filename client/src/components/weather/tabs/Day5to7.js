import React, {PropTypes} from 'react'
import moment from 'moment'
import {DateElement} from 'components/misc'
import Section from './Section'
import Loop from '../Loop'

Day5to7.propTypes = {
    date: PropTypes.instanceOf(Date).isRequired,
    children: PropTypes.node,
}

export default function Day5to7({date, above, between, below, children}) {
    const day5 = moment(date).add(4, 'day').toDate()
    const day7 = moment(date).add(6, 'day').toDate()
    const title = (
        <div>
            <DateElement value={day5} /> to <DateElement value={day7} />
        </div>
    )
    const loop = {
        type: 'AC_GDPS_EPA_6hr-precip-clds-th-slp',
        run: 12,
        from: 120,
        to: 144,
    }

    return (
        <Section title={title}>
            {children && <Loop {...loop} />}
            {children}
        </Section>
    )
}
