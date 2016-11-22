import React, {PropTypes} from 'react'
import {compose, setDisplayName, setPropTypes, mapProps} from 'recompose'
import moment from 'moment'
import range from 'lodash/range'
import padstart from 'lodash/padStart'
import Loop from 'components/loop'
import {domain} from './config.json'

const METADATA = new Map([
    // Precipitation Hourly
    ['AC_HRDPS_BC_wms-1hr-precip', {
        title: 'Precipitation 1h HR BC',
        domain: 'bc',
        frequency: 1,
        startsAt: 0,
        unit: 'h',
        count: 43,
        // count: 49,
        runs: [6, 18],
        extension: 'png',
    }],
    ['AC_HRDPS_BC-S-Cst_1hr-precip', {
        title: 'Precipitation 1h HR SC',
        domain: 'scst',
        frequency: 1,
        startsAt: 0,
        unit: 'h',
        count: 43,
        // count: 49,
        runs: [6, 18],
        extension: 'png',
    }],
    ['AC_HRDPS_BC-S-Int_1hr-precip', {
        title: 'Precipitation 1h HR SI',
        domain: 'sint',
        frequency: 1,
        startsAt: 0,
        unit: 'h',
        count: 43,
        // count: 49,
        runs: [6, 18],
        extension: 'png',
    }],
    ['AC_RDPS_BC_precip-types', {
        title: 'Precipitation Type 3h R',
        domain: 'bc',
        frequency: 3,
        startsAt: 3,
        unit: 'h',
        count: 16,
        runs: [0, 6, 12, 18],
        extension: 'png',
    }],
    // Precipitation 12 hour Totals
    ['AC_RDPS_BC_12hr-precip', {
        title: 'Precipitation 12hr R BC',
        domain: 'bc',
        frequency: 6,
        startsAt: 12,
        unit: 'h',
        count: 7,
        runs: [0, 6, 12, 18],
        extension: 'png',
    }],
    ['AC_HRDPS_BC-S-Cst_12hr-precip', {
        title: 'Precipitation 12hr HR SC',
        domain: 'scst',
        frequency: 6,
        startsAt: 12,
        unit: 'h',
        count: 6,
        runs: [6, 18],
        extension: 'png',
    }],
    ['AC_HRDPS_BC-S-Int_12hr-precip', {
        title: 'Precipitation 12hr HR SI',
        domain: 'sint',
        frequency: 6,
        startsAt: 12,
        unit: 'h',
        count: 6,
        runs: [6, 18],
        extension: 'png',
    }],
    // Temperatures
    ['AC_HRDPS_BC_sfc-temp', {
        title: 'Temperatures Surface HR',
        domain: 'lam',
        frequency: 1,
        startsAt: 0,
        unit: 'h',
        // count: 17,
        count: 46,
        runs: [6, 12],
        extension: 'png',
    }],
    ['AC_RDPS_BC_freezing-level', {
        title: null,
        domain: 'wcst',
        frequency: 3,
        startsAt: 0,
        unit: 'h',
        count: 17,
        runs: [0, 6, 12, 18],
        extension: 'png',
    }],
    ['AC_GDPS_BC_850-temp', {
        title: null,
        domain: 'wcst',
        frequency: 6,
        startsAt: 0,
        unit: 'h',
        count: 25,
        runs: [0, 12],
        extension: 'jpg',
    }],
    // Winds
    ['AC_RDPS_BC_marine-winds', {
        title: 'Marine Winds - R',
        domain: 'rdps_marine',
        frequency: 3,
        startsAt: 0,
        unit: 'h',
        count: 17,
        runs: [0, 6, 12, 18],
        extension: 'png',
    }],
    ['AC_GDPS_BC_850-winds', {
        title: 'Winds 1500m - G',
        domain: 'bc',
        frequency: 6,
        startsAt: 0,
        unit: 'h',
        count: 25,
        runs: [0, 12],
        extension: 'jpg',
    }],
    ['AC_GDPS_BC_750-winds', {
        title: 'Winds 2500m - G',
        domain: 'bc',
        frequency: 6,
        startsAt: 0,
        unit: 'h',
        count: 25,
        runs: [0, 12],
        extension: 'jpg',
    }],
    // Prognosis Maps
    ['AC_RDPS_CAN-W_3hr-precip-clds-th-slp', {
        title: 'Surface_Maps_0-48h_R',
        domain: 'wcst',
        frequency: 3,
        startsAt: 3,
        unit: 'h',
        count: 16,
        runs: [0, 6, 12, 18],
        extension: 'png',
    }],
    ['AC_GDPS_EPA_6hr-precip-clds-th-slp', {
        title: 'Surface_Maps_0-144h_G',
        domain: 'epac',
        frequency: 6,
        startsAt: 12,
        unit: 'h',
        count: 23,
        runs: [0, 12],
        extension: 'jpg',
        layout: 'RIGHT',
    }],
    ['AC_GDPS_EPA_clds-th-500hts', {
        title: '500mb_0-144h_G',
        domain: 'epac',
        frequency: 6,
        startsAt: 12,
        unit: 'h',
        count: 23,
        runs: [0, 12],
        extension: 'jpg',
        layout: 'RIGHT',
    }],
    ['AC_GDPS_EPA_tpw', {
        title: 'Precipitable Water (G)',
        domain: 'epac',
        frequency: 6,
        startsAt: 0,
        unit: 'h',
        count: 25,
        runs: [0, 12],
        layout: 'RIGHT',
        extension: 'jpg',
    }],
    // Radar Imagery
    ['AC_RADAR_BC_precip-rate', {
        title: 'Radar-BC-Mosaic',
        domain: 'bc',
        frequency: 10,
        startsAt: 0,
        unit: 'min',
        count: 24 * 6,
        runs: null,
        extension: 'jpg',
    }],
    ['AC_RADAR_BC-S-CST_precip-rate', {
        title: 'AC_RADAR_BC-S-CST_precip-rate',
        domain: 'scst',
        frequency: 10,
        startsAt: 0,
        unit: 'min',
        count: 24 * 6,
        runs: null,
        extension: 'jpg',
    }],
    ['AC_RADAR_BC-S-INT_precip-rate', {
        title: 'Radar-South Interior',
        domain: 'sint',
        frequency: 10,
        startsAt: 0,
        unit: 'min',
        count: 24 * 6,
        runs: null,
        extension: 'jpg',
    }],
    // Satellite Imagery
    ['AC_SAT_EPA_water-vapour-jet', {
        title: 'Water Vapour-Jet',
        domain: 'epac',
        frequency: 60,
        startsAt: 30,
        unit: 'min',
        count: 24,
        runs: null,
        extension: 'jpg',
        layout: 'RIGHT',
    }],
    ['AC_SAT_EPA_ir-redtop', {
        title: 'IR Pacific',
        domain: 'epac',
        frequency: 60,
        startsAt: 0,
        unit: 'min',
        count: 24,
        runs: null,
        extension: 'jpg',
        layout: 'RIGHT',
    }],
    ['AC_SAT_CAN-W-CST_ir-redtop', {
        title: 'IR West Cost',
        domain: 'wcst',
        frequency: 60,
        startsAt: 0,
        unit: 'min',
        count: 24,
        runs: null,
        extension: 'jpg',
    }],
    ['AC_SAT_BC_ir-vis', {
        title: 'IR-Vis',
        domain: 'lam',
        frequency: 60,
        startsAt: 0,
        unit: 'min',
        count: 24,
        runs: null,
        extension: 'jpg',
    }],
    // Current/Warnings
    ['AC_PLOT_BC_weather-warnings', {
        title: 'Weather-Warnings',
        domain: 'bc',
        frequency: 30,
        startsAt: 0,
        unit: 'min',
        count: 1,
        runs: null,
        extension: 'png',
    }],
    ['AC_PLOT_BC_precip-24hr', {
        title: 'Precip_Past_24h_Estimate_bc',
        domain: 'bc',
        frequency: 24,
        startsAt: 0,
        unit: 'h',
        count: 7,
        runs: [0],
        extension: 'png',
    }],
    ['AC_PLOT_BC_actual-temps', {
        title: 'Temperatures-MSLP',
        domain: 'wcst',
        frequency: 60,
        startsAt: 0,
        unit: 'min',
        count: 24,
        runs: null,
        extension: 'jpg',
    }],
])

export const TYPES = Array.from(METADATA.keys())

function formatUrls({type, date = new Date(), run}) {
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
        return null
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

    return format({
        type,
        date,
        run,
        step,
        extension,
        unit,
    })
}

function format({type, date, run, step, extension, unit}) {
	return [
        domain,
        date.getFullYear(),
        padstart(date.getMonth() + 1, 2, '0'),
        padstart(String(date.getDate()), 2, '0'),
        `${type}_${moment(date).format('YYYYMMDD')}${run}_${padstart(String(step), unit === 'min' ? 4 : 3, '0')}${unit === 'min' ? 'Z' : 'HR'}.${extension}`
    ].join('/')
}

export default compose(
    setDisplayName('WeatherLoop'),
    setPropTypes({
        type: PropTypes.oneOf(TYPES).isRequired,
        run: PropTypes.number,
        date: PropTypes.instanceOf(Date),
        hours: PropTypes.arrayOf(PropTypes.number),
    }),
    mapProps(props => ({
        urls: formatUrls(props),
        openImageInNewTab: true,
        layout: METADATA.get(props.type).layout,
    })),
)(Loop)
