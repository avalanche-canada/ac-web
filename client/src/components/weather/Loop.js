import React, {PropTypes} from 'react'
import {compose, setDisplayName, setPropTypes, mapProps} from 'recompose'
import moment from 'moment'
import range from 'lodash/range'
import padstart from 'lodash/padstart'
import Loop from 'components/loop'
import {domain} from './config.json'

const HOURS = new Map([
	['Freezing_Level_3h_R_wcst', range(0, 48, 6)],
	['Precipitation_12h_R_BC', range(12, 48 + 1, 12)],
	['Precipitation_Type_3h_R_bc', range(0, 48, 3)],
	['Surface_Maps_0-48_R_wcst', range(0, 48, 6)],
	['Winds_2500m_3h_G_wcst', range(0, 144, 6)],
	['Temperatures_1500m_6h_G_wcst', range(0, 144, 6)],
	['Surface_Maps_0-48_G_epac', range(0, 144, 6)],
	['500mb_G_epac', range(0, 144, 6)],
	['Precipitable_Water_6h_G_epac', range(0, 144, 6)],
	['Precipitation_1h_HR_BC', range(0, 42)],
	['Precipitation_1h_HR_scst', range(0, 42)],
	['Precipitation_1h_HR_sint', range(0, 42)],
	['Precipitation_12h_HR_scst', range(12, 48, 12)],
	['Precipitation_12h_HR_sint', range(12, 48, 12)],
])

const RUNS = new Map([
	['Freezing_Level_3h_R_wcst', range(0, 24, 6)],
	['Precipitation_12h_R_BC', range(0, 24, 6)],
	['Precipitation_Type_3h_R_bc', range(0, 24, 6)],
	['Surface_Maps_0-48_R_wcst', range(0, 24, 6)],
	['Winds_2500m_3h_G_wcst', range(0, 24, 6)],
	['Temperatures_1500m_6h_G_wcst', range(0, 24, 6)],
	['Surface_Maps_0-48_G_epac', range(0, 24, 6)],
	['500mb_G_epac', range(0, 24, 12)],
	['Precipitable_Water_6h_G_epac', range(0, 24, 6)],
	['Precipitation_1h_HR_BC', [6, 18]],
	['Precipitation_1h_HR_scst', [6, 18]],
	['Precipitation_1h_HR_sint', [6, 18]],
	['Precipitation_12h_HR_scst', [6, 18]],
	['Precipitation_12h_HR_sint', [6, 18]],
])

export const TYPES = [...HOURS.keys()]

const {isArray} = Array

export function formatUrl({type, date = new Date(), run, hour, hours}) {
    if (isArray(hours)) {
        return hours.map(hour => formatUrl({type, date, run, hour}))
    }

	hour = padstart(String(hour), 3, '0')
	run = padstart(String(run), 2, '0')
	date = moment(date).format('YYYYMMDD')

	return `${domain}/loops/images/${type}-${date}${run}-${hour}00.jpg`
}

function propsMapper({
    type,
    run = RUNS.get(type)[0],
    date = new Date(),
    hours = HOURS.get(type)
}) {
    return {
        urls: formatUrl({date, type, run, hours}),
        openImageInNewTab: true,
    }
}

export default compose(
    setDisplayName('WeatherLoop'),
    setPropTypes({
        type: PropTypes.oneOf(TYPES).isRequired,
        run: PropTypes.number.isRequired,
        date: PropTypes.instanceOf(Date),
        hours: PropTypes.arrayOf(PropTypes.number),
    }),
    mapProps(propsMapper),
)(Loop)
