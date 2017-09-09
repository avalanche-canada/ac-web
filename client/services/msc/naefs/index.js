import { naefs } from '~/services/msc/config.json'
import padstart from 'lodash/padStart'
import formatDate from 'date-fns/format'

export const PRECIPITATION = 'PR-1'
export const ACCUMULATED_PRECIPITATION = 'PR-1ACC'
export const MAXIMUM_TEMPERATURE = 'T812000'
export const MINIMUM_TEMPERATURE = 'T712000'

export const PRODUCTS = new Set([
    PRECIPITATION,
    ACCUMULATED_PRECIPITATION,
    MAXIMUM_TEMPERATURE,
    MINIMUM_TEMPERATURE,
])

export const MAPS = new Set(['GZ500', 'DZ500'])

export const PARAMETERS = new Map([
    [
        MINIMUM_TEMPERATURE,
        new Map([
            ['LT0', 'under 0°C'],
            ['LT-5', 'under -5°C'],
            ['LT-15', 'under -15°C'],
            ['LT-30', 'under -30°C'],
        ]),
    ],
    [
        MAXIMUM_TEMPERATURE,
        new Map([
            ['GT0', 'over 0°C'],
            ['GT15', 'over 15°C'],
            ['GT30', 'over 30°C'],
        ]),
    ],
    [
        PRECIPITATION,
        new Map([
            ['GT0.0002', 'more than 0.2mm'],
            ['GT0.002', 'more than 2mm'],
            ['GT0.005', 'more than 5mm'],
            ['GT0.010', 'more than 10mm'],
            ['GT0.025', 'more than 25mm'],
        ]),
    ],
    [
        ACCUMULATED_PRECIPITATION,
        new Map([
            ['GT0.0002', 'more than 0.2mm'],
            ['GT0.002', 'more than 2mm'],
            ['GT0.005', 'more than 5mm'],
            ['GT0.010', 'more than 10mm'],
            ['GT0.025', 'more than 25mm'],
            ['GT0.050', 'more than 50mm'],
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

    date = formatDate(date, 'YYYYMMDD')
    run = padstart(String(run), 2, '0')
    start = padstart(String(start), 3, '0')
    end = padstart(String(end), 3, '0')

    return `${naefs.produit}/${product}/${param}/CMC_NCEP/${date}${run}_${start}_${end}.gif`
}

export function carte({ product, date, run = 0, hour = 0 }) {
    if (!MAPS.has(product)) {
        throw new Error(`map = ${product} does not exist`)
    }

    date = formatDate(date, 'YYYYMMDD')
    run = padstart(String(run), 2, '0')
    hour = padstart(String(hour), 3, '0')

    return `${naefs.carte}/${product}/CMC_NCEP/${date}${run}_${hour}.gif`
}

export function epsgram({ code, date, run = 0 }) {
    date = formatDate(date, 'YYYYMMDD')
    run = padstart(String(run), 2, '0')

    return `${naefs.epsgram}/${date}${run}_054@007_E1_${code}_I_NAEFS@EPSGRAMS_tt@surf@nt@pr@ws@surf_360.png`
}
