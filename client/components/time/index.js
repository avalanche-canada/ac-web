import React from 'react'
import parse from 'date-fns/parse'
import { FormattedDate, FormattedTime } from 'react-intl'
import { DATE, DATETIME, isStartOfDay } from 'utils/date'
import * as FORMATS from 'constants/intl'
import Relative from './Relative'
import Range from './Range'

export { Relative }
export { Range }

export function Time({ value = new Date() }) {
    value = parse(value)
    return <FormattedTime value={value} />
}

export function DateTime({ value = new Date(), skipTimeIfStartOfDay = false }) {
    value = parse(value)
    let options = FORMATS.DATE

    if (!skipTimeIfStartOfDay && !isStartOfDay(value)) {
        options = FORMATS.DATETIME
    }

    return <FormattedDate value={value} {...options} />
}

export function Day({ value = new Date() }) {
    value = parse(value)

    return <FormattedDate value={value} weekday="long" />
}

export function DateElement({ value = new Date() }) {
    value = parse(value)

    return <FormattedDate value={value} {...FORMATS.DATE} />
}

// Utils
export function dateTimeFormatGetter(date) {
    return isStartOfDay(parse(date)) ? DATE : DATETIME
}
