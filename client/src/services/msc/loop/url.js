import range from 'lodash/range'
import padstart from 'lodash/padStart'
import {Forecast, CurrentConditions} from './Metadata'
import {domain} from '../config.json'
import setMinutes from 'date-fns/set_minutes'
import addDays from 'date-fns/add_days'
import addMinutes from 'date-fns/add_minutes'
import startOfDay from 'date-fns/start_of_day'
import format from 'date-fns/format'
import differenceInMinutes from 'date-fns/difference_in_minutes'

export function getNotes(type) {
    if (Forecast.has(type)) {
        return getForecastNotes(type).concat(Forecast.get(type).notes)
    } else if (CurrentConditions.has(type)) {
        return CurrentConditions.get(type).notes
    } else {
        throw new Error(`Loop of type=${type} not recognized.`)
    }
}

function getForecastNotes(type) {
    if (!Forecast.has(type)) {
        throw new Error(`Unrecognizable Forecast loop type=${type}.`)
    }

    const updates = Forecast.get(type).runs.map(run => {
        const date = new Date()

        date.setUTCHours(run)
        date.setUTCMinutes(30)

        return date
    })
    .sort((left, right) => {
        if (left.getHours() > right.getHours()) {
            return 1
        }
        if (left.getHours() > right.getHours()) {
            return -1
        }

        return 0
    })
    .map(date => format(date, 'HH[:]mm'))

    const last = updates.pop()

    return [`Updated at approximately ${updates.join(', ')} & ${last} every day.`]
}

export async function computeUrls(props) {
    const {type} = props

    if (Forecast.has(type)) {
        return computeForecastUrls(props)
    } else if (CurrentConditions.has(type)) {
        return computeCurrentConditionsUrls(props)
    } else {
        throw new Error(`Loop of type=${type} not recognized.`)
    }
}

async function computeForecastUrls({
    type,
    run,
    date = new Date(),
    from,
    to,
}) {
    if (!Forecast.has(type)) {
        throw new Error(`Unrecognizable Forecast loop type=${type}.`)
    }

    let {hours} = Forecast.get(type)
    if (typeof from === 'number') {
        hours = hours.filter(hour => hour >= from)
    }

    if (typeof to === 'number') {
        hours = hours.filter(hour => hour <= to)
    }

    let attempts = 0

    while (attempts < 10) {
        attempts++
        try {

            if (typeof run === 'number') {
                await loadImage(
                    formatForecastUrl(type, date, run, hours[0])
                )
            } else {
                run = await getRun(type, date)
            }

            return hours.map(
                hour => formatForecastUrl(type, date, run, hour)
            )
        } catch (e) {
            date = addDays(date, -1)
        }
    }

    throw new Error(`Can not create Forecast loop of type=${type}.`)
}

async function computeCurrentConditionsUrls({
    type,
    amount = null,
    date = new Date(),
}) {
    if (!CurrentConditions.get(type)) {
        throw new Error(`Unrecognizable Current Conditions loop type=${type}.`)
    }

    const {minutes} = CurrentConditions.get(type)
    const start = startOfDay(date)
    const utcMinutes = differenceInMinutes(date, start)
    const previous = addDays(start, -1)
    let dates = [
        // after the cut off time that we bring the day before and
        // add minutes to the previous day
        ...minutes.filter(minute => minute >= utcMinutes).map(
            minute => addMinutes(previous, minute)
        ),
        // before the cut off time on the same day
        ...minutes.filter(minute => minute < utcMinutes).map(
            minute => addMinutes(start, minute)
        ),
    ]

    // Find the lastest image available and adjust the dates
    let found = false
    let i = date.length
    while (!found) {
        i = i - 1
        const date = dates.pop()

        try {
            await loadImage(formatCurrentConditionsUrl(type, date))

            dates.push(date)
            found = true
        } catch (error) {
            dates.unshift(addDays(date, -1))

            if (i === 0) {
                // start over again!
                return computeCurrentConditionsUrls({
                    type,
                    amount,
                    date: addDays(date, -1),
                })
            }
        }
    }

    if (typeof amount === 'number') {
        dates = dates.splice(dates.length - amount)
    }

    return dates.map(date =>
        formatCurrentConditionsUrl(type, date)
    )
}

export function formatForecastUrl(type, date, run, hour) {
    const year = date.getUTCFullYear()
    const month = padstart(date.getUTCMonth() + 1, 2, '0')
    const day = padstart(date.getUTCDate(), 2, '0')

    return [
        domain,
        year,
        month,
        day, [
            Forecast.getIn([type, 'id']),
            year + month + day + padstart(run, 2, '0'),
            padstart(hour, 3, '0') + 'HR.' + Forecast.getIn([type, 'extension']),
        ].join('_')
    ].join('/')
}

function formatCurrentConditionsUrl(type, date) {
    const year = date.getUTCFullYear()
    const month = padstart(date.getUTCMonth() + 1, 2, '0')
    const day = padstart(date.getUTCDate(), 2, '0')
    const hour = padstart(date.getUTCHours(), 2, '0')
    const minute = padstart(date.getUTCMinutes(), 2, '0')

    return [
        domain,
        year,
        month,
        day, [
            CurrentConditions.getIn([type, 'id']),
            year + month + day,
            `${hour}${minute}Z.${CurrentConditions.getIn([type, 'extension'])}`,
        ].join('_')
    ].join('/')
}

async function getRun(type, date) {
    const {runs, hours} = Forecast.get(type)
    const hour = date.getUTCHours()

    for (let i = runs.length - 1; i >= 0; i--) {
        const run = runs[i]
        const url = formatForecastUrl(type, date, run, hours[0])

        try {
            await loadImage(url)

            return run
        } catch (error) {
            if (i === 0) {
                throw error
            }
        }
    }
}

function loadImage(url) {
    return new Promise((resolve, reject) => {
        Object.assign(document.createElement('img'), {
            src: url,
            onload: resolve,
            onerror: reject,
        })
    })
}
