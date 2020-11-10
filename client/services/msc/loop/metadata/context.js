import React, { createContext, useContext } from 'react'
import { useIntlMemo } from 'hooks/intl'
import createMetadata from './'
import { loadImage } from 'utils/promise'
import { domain } from '../../config.json'
import addDays from 'date-fns/add_days'
import addMinutes from 'date-fns/add_minutes'
import startOfDay from 'date-fns/start_of_day'
import differenceInMinutes from 'date-fns/difference_in_minutes'

export const Context = createContext()

export function Provider({ children }) {
    const metadata = useIntlMemo(Metadata.create)

    return <Context.Provider value={metadata}>{children}</Context.Provider>
}

export function useMetadata() {
    return useContext(Context)
}

const MAX_ATTEMPTS = 10
class Metadata {
    static create(intl) {
        const data = createMetadata(intl)

        return new Metadata(data)
    }
    constructor(data) {
        this.data = data
    }
    get(type) {
        if (this.has(type)) {
            return this.data[type]
        }

        throw new Error(`Loop of type=${type} not recognized.`)
    }
    has(type) {
        return this.data.hasOwnProperty(type)
    }
    getTitle(type) {
        return this.get(type).title
    }
    getNotes(type) {
        const { notes = [] } = this.get(type)

        return notes
    }
    isForecast(type) {
        const { runs } = this.get(type)

        return Array.isArray(runs)
    }
    async computeUrls(props, maxAttempts = MAX_ATTEMPTS) {
        if (this.isForecast(props.type)) {
            // It is a forecast! Using a model...
            return this._computeForecastUrls(props, maxAttempts)
        } else {
            return this._computeCurrentConditionsUrls(props)
        }
    }
    async _computeForecastUrls(props, maxAttempts = MAX_ATTEMPTS) {
        let { type, run, date = new Date(), from, to } = props
        let { hours } = this.get(type)

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
                        this.formatForecastUrl(type, date, run, hours[0])
                    )
                } else {
                    run = await this._getRun(type, date)
                }

                return hours.map(hour =>
                    this.formatForecastUrl(type, date, run, hour)
                )
            } catch {
                date = addDays(date, -1)
            }
        }

        throw new Error(`Can not create Forecast loop of type=${type}.`)
    }
    async _computeCurrentConditionsUrls({
        type,
        amount = null,
        date = new Date(),
    }) {
        const { minutes } = this.get(type)
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
                await loadImage(this._formatCurrentConditionsUrl(type, date))

                dates.push(date)
                found = true
            } catch {
                dates.unshift(addDays(date, -1))

                if (i === 0) {
                    // start over again!
                    return this._computeCurrentConditionsUrls({
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

        const urls = dates.map(date =>
            this._formatCurrentConditionsUrl(type, date)
        )

        // TODO Remove the conversion to Set and then from Array.
        // Did that to remove the duplicate image urls at midnight.

        return Array.from(new Set(urls))
    }
    formatForecastUrl(type, date, run, hour) {
        const year = date.getUTCFullYear()
        const month = padStart(date.getUTCMonth() + 1, 2, '0')
        const day = padStart(date.getUTCDate(), 2, '0')
        const { id, extension } = this.get(type)

        return [
            domain,
            year,
            month,
            day,
            [
                id,
                year + month + day + padStart(run, 2, '0'),
                padStart(hour, 3, '0') + 'HR.' + extension,
            ].join('_'),
        ].join('/')
    }
    _formatCurrentConditionsUrl(type, date) {
        const year = date.getUTCFullYear()
        const month = padStart(date.getUTCMonth() + 1, 2, '0')
        const day = padStart(date.getUTCDate(), 2, '0')
        const hour = padStart(date.getUTCHours(), 2, '0')
        const minute = padStart(date.getUTCMinutes(), 2, '0')
        const { id, extension } = this.get(type)

        return [
            domain,
            year,
            month,
            day,
            [id, year + month + day, hour + minute + 'Z.' + extension].join(
                '_'
            ),
        ].join('/')
    }
    async _getRun(type, date) {
        const { runs, hours } = this.get(type)

        for (let i = runs.length - 1; i >= 0; i--) {
            const run = runs[i]
            const url = this.formatForecastUrl(type, date, run, hours[0])

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
}

// Utils
// TODO Should probably move more function to utils
function padStart(string, targetLength, padString) {
    return String(string).padStart(targetLength, padString)
}
