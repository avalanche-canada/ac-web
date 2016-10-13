import React, {PropTypes} from 'react'
import {compose, setDisplayName, setPropTypes, mapProps} from 'recompose'
import moment from 'moment'
import range from 'lodash/range'
import padstart from 'lodash/padStart'
import Loop from 'components/loop'
import {domain} from './config.json'

const HOURS = new Map([
    // Old images
    ['AC_RDPS_BC_12hr-precip', range(0, 48, 12)],
	['AC_RDPS_BC_2500m-wind', range(0, 48, 6)],
	['AC_RDPS_BC_3hr-precip', range(0, 48, 3)],
	['AC_RDPS_BC_freezing-level', range(0, 48, 6)],
	['AC_RDPS_BC_hal-24hr-snowfall', range(0, 48, 3)],
	['AC_RDPS_BC_weather-systems', range(0, 48, 6)],
	['AC_GDPS_BC_12hr-precip', range(0, 144, 12)],
	['AC_GDPS_BC_1500m-temp', range(0, 144, 6)],
    ['AC_GDPS_BC_2500m-wind', range(0, 144, 6)],
	['AC_GDPS_EPA_clouds-500hgts', range(0, 144, 6)],
	['AC_GDPS_EPA_pacific-systems', range(0, 144, 6)],
	['AC_GDPS_EPA_precipitable-water', range(0, 144, 6)],
	['AC_HRDPS_BC_wms-1hr-precip', range(0, 48)],
	['AC_HRDPS_BC_wms-cumulative-precip', range(0, 48, 6)],
	['AC_RDPS_BC_12hr-precip1', range(12, 48 + 1, 12)],
	['AC_RDPS_BC_precip-types', range(0, 48, 3)],
	['AC_RDPS_W-CST_3hr-precip-clds-th-slp', range(0, 48, 6)],
	['AC_GDPS_BC_750-wind', range(0, 144, 6)],
	['AC_GDPS_BC_850-temp', range(0, 144, 6)],
	['AC_GDPS_EPA_clouds-precip-th-slp', range(0, 144, 6)],
	['AC_GDPS_EPA_clouds-th-500hts', range(0, 144, 6)],
	['AC_GDPS_EPA_tpw', range(0, 144, 6)],
	['AC_GDPS_W-CAN_precip-th-slp', range(0, 144, 6)],
	['AC_HRDPS_BC_wms-1hr-precip1', range(0, 42)],
	['AC_HRDPS_BC-LAM_1hr-precip', range(0, 42)],
	['AC_HRDPS_S-CST_12hr-precip', range(12, 48, 12)],
	['AC_HRDPS_S-INT_12hr-precip', range(12, 48, 12)],
        // New images
	// ['Freezing_Level_3h_R_wcst', range(0, 48, 6)],
	// ['Precipitation_12h_R_BC', range(12, 48 + 1, 12)],
	// ['Precipitation_Type_3h_R_bc', range(0, 48, 3)],
	// ['Surface_Maps_0-48_R_wcst', range(0, 48, 6)],
	// ['Winds_2500m_3h_G_wcst', range(0, 144, 6)],
	// ['Temperatures_1500m_6h_G_wcst', range(0, 144, 6)],
	// ['Surface_Maps_0-48_G_epac', range(0, 144, 6)],
	// ['500mb_G_epac', range(0, 144, 6)],
	// ['Precipitable_Water_6h_G_epac', range(0, 144, 6)],
	// ['Precipitation_1h_HR_BC', range(0, 42)],
	// ['Precipitation_1h_HR_scst', range(0, 42)],
	// ['Precipitation_1h_HR_sint', range(0, 42)],
	// ['Precipitation_12h_HR_scst', range(12, 48, 12)],
	// ['Precipitation_12h_HR_sint', range(12, 48, 12)],
])

const RUNS = new Map([
    // Old images
    ['AC_RDPS_BC_12hr-precip', range(0, 24, 6)],
	['AC_RDPS_BC_2500m-wind', range(0, 24, 6)],
	['AC_RDPS_BC_3hr-precip', range(0, 24, 6)],
	['AC_RDPS_BC_freezing-level', range(0, 24, 6)],
	['AC_RDPS_BC_hal-24hr-snowfall', range(0, 24, 6)],
	['AC_RDPS_BC_weather-systems', range(0, 24, 6)],
	['AC_GDPS_BC_12hr-precip', range(0, 24, 6)],
	['AC_GDPS_BC_1500m-temp', range(0, 24, 6)],
    ['AC_GDPS_BC_2500m-wind', range(0, 24, 6)],
	['AC_GDPS_EPA_clouds-500hgts', range(0, 24, 6)],
	['AC_GDPS_EPA_pacific-systems', range(0, 24, 6)],
	['AC_GDPS_EPA_precipitable-water', range(0, 24, 6)],
	['AC_HRDPS_BC_wms-1hr-precip', range(0, 24, 6)],
	['AC_HRDPS_BC_wms-cumulative-precip', range(0, 24, 6)],
	['AC_RDPS_BC_12hr-precip1', range(0, 24, 6)],
	['AC_RDPS_BC_precip-types', range(0, 24, 6)],
	['AC_RDPS_W-CST_3hr-precip-clds-th-slp', range(0, 24, 6)],
	['AC_GDPS_BC_750-wind', range(0, 24, 6)],
	['AC_GDPS_BC_850-temp', range(0, 24, 6)],
	['AC_GDPS_EPA_clouds-precip-th-slp', range(0, 24, 6)],
	['AC_GDPS_EPA_clouds-th-500hts', range(0, 24, 12)],
	['AC_GDPS_EPA_tpw', range(0, 24, 6)],
	['AC_GDPS_W-CAN_precip-th-slp', range(0, 24, 6)],
	['AC_HRDPS_BC_wms-1hr-precip1', [6, 18]],
	['AC_HRDPS_BC-LAM_1hr-precip', [6, 18]],
	['AC_HRDPS_S-CST_12hr-precip', [6, 18]],
	['AC_HRDPS_S-INT_12hr-precip', [6, 18]],
    // New images
	// ['Freezing_Level_3h_R_wcst', range(0, 24, 6)],
	// ['Precipitation_12h_R_BC', range(0, 24, 6)],
	// ['Precipitation_Type_3h_R_bc', range(0, 24, 6)],
	// ['Surface_Maps_0-48_R_wcst', range(0, 24, 6)],
	// ['Winds_2500m_3h_G_wcst', range(0, 24, 6)],
	// ['Temperatures_1500m_6h_G_wcst', range(0, 24, 6)],
	// ['Surface_Maps_0-48_G_epac', range(0, 24, 6)],
	// ['500mb_G_epac', range(0, 24, 12)],
	// ['Precipitable_Water_6h_G_epac', range(0, 24, 6)],
	// ['Precipitation_1h_HR_BC', [6, 18]],
	// ['Precipitation_1h_HR_scst', [6, 18]],
	// ['Precipitation_1h_HR_sint', [6, 18]],
	// ['Precipitation_12h_HR_scst', [6, 18]],
	// ['Precipitation_12h_HR_sint', [6, 18]],
])

export const TYPES = [...HOURS.keys()]

export function formatUrl({type, date = new Date(), run, hour, hours}) {
    if (Array.isArray(hours)) {
        return hours.map(hour => formatUrl({type, date, run, hour}))
    }

	hour = padstart(String(hour), 3, '0')
	run = padstart(String(run), 2, '0')
	date = moment(date).format('YYYYMMDD')

	return `${domain}/loops/images/${type}_${date}${run}_${hour}HR.jpg`
	// return `${domain}/loops/images/${type}-${date}${run}-${hour}00.jpg`
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
