import moment from 'moment'
import range from 'lodash/range'
import padstart from 'lodash/padStart'
import METADATA from './Metadata'
import {domain} from './config.json'

function formatUrls({type, date = new Date(), run}) {
    if (!METADATA.has(type)) {
        throw new Error(`Unrecognizable loop type ${type}.`)
    }

    const {
        frequency,
        unit,
        count,
        runs,
        extension,
        startsAt,
    } = METADATA.get(type)
    run = runs === null ? '' : padstart(String(run || runs[0]), 2, '0')

    return Array(count).fill(0)
            .map((value, index) => {
                const step = startsAt + index * frequency

                if (unit === 'min') {
                    return `${Math.floor(step / 60)}${padstart(String(step % 60), 2, '0')}`
                }

                return step
            })
            .map(step => {
                return format({
                    type,
                    date,
                    run,
                    step,
                    extension,
                    unit,
                })
            })
}

export function formatUrl({type, date = new Date(), run}) {
    if (!METADATA.has(type)) {
        throw new Error(`Unrecognizable loop type ${type}.`)
    }

    const {
        frequency,
        unit,
        count,
        runs,
        extension,
        startsAt,
    } = METADATA.get(type)
    run = runs === null ? '' : padstart(String(run || runs[0]), 2, '0')
    date = moment.utc(date)

    return format({
        type,
        date,
        run,
        step,
        extension,
        unit,
    })
}

function formatWithRun(type, date, hour, extension) {
	return [
        domain,
        date.format('YYYY[/]MM[/]DD'), [
            type,
            date.format('YYYYMMDDHH'),
            `${padstart(hour, 3, '0')}HR.${extension}`
        ].join('_')
    ].join('/')
}

function format(type, date, minute, extension) {
	return [
        domain,
        date.format('YYYY[/]MM[/]DD'), [
            type,
            date.format('YYYYMMDD'),
            `${date.minutes(minute).format('HHmm')}Z.${extension}`
        ].join('_')
    ].join('/')
}
