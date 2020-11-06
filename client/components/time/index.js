import React from 'react'
import parse from 'date-fns/parse'
import { FormattedDate, FormattedTime } from 'react-intl'
import { DATE, DATETIME, isStartOfDay } from 'utils/date'
import * as FORMATS from 'constants/intl'

export Relative from './Relative'
export Range from './Range'

export function Time({ value }) {
    value = parse(value)
    return <FormattedTime value={value} />
}

export function DateTime({ value, skipTimeIfStartOfDay = false }) {
    value = parse(value)
    let options = FORMATS.DATE

    if (!skipTimeIfStartOfDay && !isStartOfDay(value)) {
        options = FORMATS.DATETIME
    }

    return <FormattedDate value={value} {...options} />
}

export function Day({ value }) {
    value = parse(value)

    return <FormattedDate value={value} weekday="long" />
}

export function DateElement({ value }) {
    value = parse(value)

    return <FormattedDate value={value} {...FORMATS.DATE} />
}

// Utils
export function dateTimeFormatGetter(date) {
    return isStartOfDay(parse(date)) ? DATE : DATETIME
}
