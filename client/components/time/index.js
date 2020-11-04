import React from 'react'
import parse from 'date-fns/parse'
import { FormattedDate, FormattedTime } from 'react-intl'
import { DATE, DATETIME, isStartOfDay } from 'utils/date'

export Relative from './Relative'
export Range from './Range'

export function Time({ value }) {
    value = parse(value)
    return <FormattedTime value={value} />
}

export function DateTime({ value, skipTimeIfStartOfDay = false }) {
    value = parse(value);
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }

    if (!skipTimeIfStartOfDay && !isStartOfDay(value)) {
        Object.assign(options, {
            hour: 'numeric',
            minute: 'numeric',
            hour12: false,
        })
    }

    return <FormattedDate value={value} {...options} />
}

export function Day({ value }) {
    value = parse(value)
    return <FormattedDate value={value} weekday="long" />
}

export function DateElement({ value }) {
    value = parse(value)
    return (
        <FormattedDate
            value={value}
            weekday="long"
            year="numeric"
            month="long"
            day="numeric"
        />
    )
}

// Utils
export function dateTimeFormatGetter(date) {
    return isStartOfDay(parse(date)) ? DATE : DATETIME
}
