import padstart from 'lodash/padStart'
import { domain } from '../config.json'
import addDays from 'date-fns/add_days'
import addMinutes from 'date-fns/add_minutes'
import startOfDay from 'date-fns/start_of_day'
import formatDate from 'date-fns/format'
import differenceInMinutes from 'date-fns/difference_in_minutes'
import { loadImage } from 'utils/promise'

const MAX_ATTEMPTS = 10

export function isForecast({ runs }) {
    return Array.isArray(runs)
}

export function getNotes(metadata, type) {
    if (!metadata.hasOwnProperty(type)) {
        throw new Error(`Loop of type=${type} not recognized.`)
    }

    const { notes } = metadata[type]

    if (isForecast(metadata[type])) {
        return getForecastNotes(metadata[type]).concat(notes)
    }

    return notes
}

function getForecastNotes({ updates }) {
    updates = updates
        .map(update => {
            const date = new Date()

            date.setHours(update)
            date.setMinutes(0)

            return date
        })
        .sort(hourSorter)
        .map(date => formatDate(date, 'HH[:]mm'))

    const last = updates.pop()

    return [
        `Updated at approximately ${updates.join(', ')} & ${last} every day.`,
    ]
}

function hourSorter(left, right) {
    if (left.getHours() > right.getHours()) {
        return 1
    }
    if (left.getHours() > right.getHours()) {
        return -1
    }

    return 0
}

export async function computeUrls(metadata, props, maxAttempts = MAX_ATTEMPTS) {
    const { type } = props

    if (!metadata.hasOwnProperty(type)) {
        throw new Error(`Loop of type=${type} not recognized.`)
    }

    if (isForecast(metadata[type])) {
        // It is a forecast! Using a model...
        return computeForecastUrls(metadata, props, maxAttempts)
    } else {
        return computeCurrentConditionsUrls(metadata, props)
    }
}

async function computeForecastUrls(
    metadata,
    { type, run, date = new Date(), from, to },
    maxAttempts = MAX_ATTEMPTS
) {
    if (!metadata.hasOwnProperty(type)) {
        throw new Error(`Unrecognizable Forecast loop type=${type}.`)
    }

    let { hours } = metadata[type]

    if (typeof from === 'number') {
        hours = hours.filter(hour => hour >= from)
    }

    if (typeof to === 'number') {
        hours = hours.filter(hour => hour <= to)
    }

    let attempts = 0

    while (attempts < maxAttempts) {
        attempts++

        try {
            if (typeof run === 'number') {
                await loadImage(
                    formatForecastUrl(metadata, type, date, run, hours[0])
                )
            } else {
                run = await getRun(metadata, type, date)
            }

            return hours.map(hour =>
                formatForecastUrl(metadata, type, date, run, hour)
            )
        } catch (e) {
            date = addDays(date, -1)
        }
    }

    throw new Error(`Can not create Forecast loop of type=${type}.`)
}

async function computeCurrentConditionsUrls(
    metadata,
    { type, amount = null, date = new Date() }
) {
    if (!metadata.hasOwnProperty(type)) {
        throw new Error(`Unrecognizable Current Conditions loop type=${type}.`)
    }

    const { minutes } = metadata[type]
    const start = startOfDay(date)
    const utcMinutes = differenceInMinutes(date, start)
    const previous = addDays(start, -1)
    let dates = [
        // after the cut off time that we bring the day before and
        // add minutes to the previous day
        ...minutes
            .filter(minute => minute >= utcMinutes)
            .map(minute => addMinutes(previous, minute)),
        // before the cut off time on the same day
        ...minutes
            .filter(minute => minute < utcMinutes)
            .map(minute => addMinutes(start, minute)),
    ]

    // Find the lastest image available and adjust the dates
    let found = false
    let i = date.length
    while (!found) {
        i = i - 1
        const date = dates.pop()

        try {
            await loadImage(formatCurrentConditionsUrl(metadata, type, date))

            dates.push(date)
            found = true
        } catch (error) {
            dates.unshift(addDays(date, -1))

            if (i === 0) {
                // start over again!
                return computeCurrentConditionsUrls(metadata, {
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

    return dates.map(date => formatCurrentConditionsUrl(metadata, type, date))
}

export function formatForecastUrl(metadata, type, date, run, hour) {
    const year = date.getUTCFullYear()
    const month = padstart(date.getUTCMonth() + 1, 2, '0')
    const day = padstart(date.getUTCDate(), 2, '0')
    const { id, extension } = metadata[type]

    return [
        domain,
        year,
        month,
        day,
        [
            id,
            year + month + day + padstart(run, 2, '0'),
            padstart(hour, 3, '0') + 'HR.' + extension,
        ].join('_'),
    ].join('/')
}

function formatCurrentConditionsUrl(metadata, type, date) {
    const year = date.getUTCFullYear()
    const month = padstart(date.getUTCMonth() + 1, 2, '0')
    const day = padstart(date.getUTCDate(), 2, '0')
    const hour = padstart(date.getUTCHours(), 2, '0')
    const minute = padstart(date.getUTCMinutes(), 2, '0')
    const { id, extension } = metadata[type]

    return [
        domain,
        year,
        month,
        day,
        [id, year + month + day, `${hour}${minute}Z.${extension}`].join('_'),
    ].join('/')
}

async function getRun(metadata, type, date) {
    const { runs, hours } = metadata[type]

    for (let i = runs.length - 1; i >= 0; i--) {
        const run = runs[i]
        const url = formatForecastUrl(metadata, type, date, run, hours[0])

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
