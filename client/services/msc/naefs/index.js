import { naefs } from 'services/msc/config.json'
import padstart from 'lodash/padStart'
import baseFormatDate from 'date-fns/format'

export const PRECIPITATION = 'PR-1'
export const ACCUMULATED_PRECIPITATION = 'PR-1ACC'
export const MINIMUM_TEMPERATURE = 'T712000'
export const MAXIMUM_TEMPERATURE = 'T812000'

export const PRODUCTS = new Set([
    PRECIPITATION,
    ACCUMULATED_PRECIPITATION,
    MAXIMUM_TEMPERATURE,
    MINIMUM_TEMPERATURE,
])

export const MAPS = new Set(['GZ500', 'DZ500'])

export const PARAMETERS = new Map([
    [MINIMUM_TEMPERATURE, new Set(['LT0', 'LT-5', 'LT-15', 'LT-30'])],
    [MAXIMUM_TEMPERATURE, new Set(['GT0', 'GT15', 'GT30'])],
    [
        PRECIPITATION,
        new Set(['GT0.0002', 'GT0.002', 'GT0.005', 'GT0.010', 'GT0.025']),
    ],
    [
        ACCUMULATED_PRECIPITATION,
        new Set([
            'GT0.0002',
            'GT0.002',
            'GT0.005',
            'GT0.010',
            'GT0.025',
            'GT0.050',
        ]),
    ],
])

export function format({ product, param, date, run = 0, start, end }) {
    if (!PRODUCTS.has(product)) {
        throw new Error(`product = ${product} does not exist`)
    }

    if (!PARAMETERS.get(product).has(param)) {
        throw new Error(
            `param = ${param} does not exist for product = ${product}`
        )
    }

    date = formatDate(date)
    run = padRun(run)
    start = padstart(String(start), 3, '0')
    end = padstart(String(end), 3, '0')

    return `${naefs.produit}/${product}/${param}/CMC_NCEP/${date}${run}_${
        start
    }_${end}.gif`
}

export function carte({ product, date, run = 0, hour = 0 }) {
    if (!MAPS.has(product)) {
        throw new Error(`map = ${product} does not exist`)
    }

    date = formatDate(date)
    run = padRun(run)
    hour = padHour(hour)

    return `${naefs.carte}/${product}/CMC_NCEP/${date}${run}_${hour}.gif`
}

export function epsgram({ code, date, run = 0 }) {
    date = formatDate(date)
    run = padRun(run)

    return `${naefs.epsgram}/${date}${run}_054@007_E1_${
        code
    }_I_NAEFS@EPSGRAMS_tt@surf@nt@pr@ws@surf_360.png`
}

export function spaghetti({ date, run = 0, hPa = 546, hour = 0 }) {
    date = formatDate(date)
    hour = padHour(hour)
    run = padRun(run)

    return `https://weather.gc.ca/data/ensemble/images/${date}${
        run
    }_054_E1_north@america_I_ENSEMBLE_spag@${hPa}_${hour}.png`
}

// Utils
function padRun(run) {
    return padstart(String(run), 2, '0')
}
function padHour(hour) {
    return padstart(String(hour), 3, '0')
}
function formatDate(date = new Date()) {
    return baseFormatDate(date, 'YYYYMMDD')
}
