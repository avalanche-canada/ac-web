import React from 'react'
import PropTypes from 'prop-types'
import Section from './Section'
import Loop from '../Loop'
import addDays from 'date-fns/add_days'
import { FormattedMessage, useIntl } from 'react-intl'
import { DATE } from 'constants/intl'

Day3To4.propTypes = {
    date: PropTypes.instanceOf(Date).isRequired,
    children: PropTypes.node,
}

export default function Day3To4({ date, children }) {
    return (
        <Section title={<Title date={date} />}>
            {children && (
                <Loop
                    type="AC_GDPS_EPA_6hr-precip-clds-th-slp"
                    date={addDays(date, -1)}
                    run={12}
                    from={72}
                    to={120}
                />
            )}
            {children}
        </Section>
    )
}

// Utils
Title.propTypes = {
    date: PropTypes.instanceOf(Date).isRequired,
}

function Title({ date }) {
    const intl = useIntl()
    const values = {
        from: intl.formatDate(addDays(date, 2), DATE),
        to: intl.formatDate(addDays(date, 3), DATE),
    }

    return (
        <FormattedMessage
            description="Component weather/tabs/Day3To4"
            defaultMessage="{from} and {to}"
            values={values}
        />
    )
}
