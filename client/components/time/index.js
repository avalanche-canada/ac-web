import React from 'react'
import startOfDay from 'date-fns/start_of_day'
import parse from 'date-fns/parse'
import { DATE, DATETIME, TIME } from 'utils/date'
import Base from './Time'

export Relative from './Relative'
export Range from './Range'

export function Time(props) {
    return <Base format={TIME} {...props} />
}

export function DateTime(props) {
    return <Base format={dateTimeFormatGetter} {...props} />
}

export function Day(props) {
    return <Base format="dddd" {...props} />
}

export function DateElement(props) {
    return <Base format={DATE} {...props} />
}

// Utils
export function dateTimeFormatGetter(date) {
    date = parse(date)

    if (startOfDay(date).getTime() === date.getTime()) {
        return DATE
    }

    return DATETIME
}
