import { setUTCOffset } from 'utils/date'
import format from 'date-fns/format'

export function createHour(intl) {
    return {
        name: 'hour',
        title: intl.formatMessage({
            description: 'Component weather/station/columns',
            defaultMessage: 'Hour',
        }),
        property({ measurementDateTime, utcOffset }) {
            return format(setUTCOffset(measurementDateTime, utcOffset), 'HH[h]')
        },
    }
}

export function createSnowHeight(intl) {
    return {
        name: 'snowHeight',
        title: intl.formatMessage({
            description: 'Component weather/station/columns',
            defaultMessage: 'Height',
        }),
        property: maybeNull('snowHeight', snowHeight => Math.round(snowHeight)),
        style: {
            minWidth: 65,
        },
    }
}

export function createNewSnow(intl) {
    return {
        name: 'newSnow',
        title: intl.formatMessage({
            description: 'Component weather/station/columns',
            defaultMessage: 'New',
        }),
        property: maybeNull('newSnow'),
        style: {
            minWidth: 65,
        },
    }
}

export function createAirTemperatureAvg(intl) {
    return {
        name: 'airTempAvg',
        title: intl.formatMessage({
            description: 'Component weather/station/columns',
            defaultMessage: 'Air Temperature Average (°C)',
        }),
        property: maybeNull('airTempAvg', singleDecimal),
        style: {
            minWidth: 65,
        },
    }
}

export function createAirTemperatureMax(intl) {
    return {
        name: 'airTempMax',
        title: intl.formatMessage({
            description: 'Component weather/station/columns',
            defaultMessage: 'Air Temperature Max (°C)',
        }),
        property: maybeNull('airTempMax'),
        style: {
            minWidth: 65,
        },
    }
}

export function createAirTemperatureMin(intl) {
    return {
        name: 'airTempMin',
        title: intl.formatMessage({
            description: 'Component weather/station/columns',
            defaultMessage: 'Air Temperature Min (°C)',
        }),
        property: maybeNull('airTempMin'),
        style: {
            minWidth: 65,
        },
    }
}

export function createWindSpeedAvg(intl) {
    return {
        name: 'windSpeedAvg',
        title: intl.formatMessage({
            description: 'Component weather/station/columns',
            defaultMessage: 'Wind Speed Average (km/h)',
        }),
        property: maybeNull('windSpeedAvg', singleDecimal),
        style: {
            minWidth: 65,
        },
    }
}

export function createWindDirectionAvg(intl) {
    return {
        name: 'windDirAvg',
        title: intl.formatMessage({
            description: 'Component weather/station/columns',
            defaultMessage: 'Wind Direction Average',
        }),
        property({ windDirAvg, windDirCompass }) {
            if (typeof windDirAvg === 'number') {
                const value = windDirAvg + ' °'

                if (windDirCompass) {
                    return value + ` (${windDirCompass})`
                }

                return value
            }

            if (windDirCompass) {
                return windDirCompass
            }

            return DASH
        },
        style: {
            minWidth: 105,
        },
    }
}

export function createWindSpeedGust(intl) {
    return {
        name: 'windSpeedGust',
        title: intl.formatMessage({
            description: 'Component weather/station/columns',
            defaultMessage: 'Wind Speed Gust (km/h)',
        }),
        property: maybeNull('windSpeedGust', singleDecimal),
        style: {
            minWidth: 65,
        },
    }
}

export function createRelativeHumidity(intl) {
    return {
        name: 'relativeHumidity',
        title: intl.formatMessage({
            description: 'Component weather/station/columns',
            defaultMessage: 'Relative Humidity (%)',
        }),
        property: maybeNull('relativeHumidity', rh =>
            Math.min(Math.round(rh), 100)
        ),
        style: {
            minWidth: 65,
        },
    }
}

// Constants and utils
const DASH = '—'

//
// Check if properties are null/undefined/NaN and return a dash otherwise
// process and return that value
//
function maybeNull(name, fn = x => x) {
    return function(obj) {
        const value = obj[name]

        if (value === undefined || value === null || isNaN(value)) {
            return DASH
        }

        return fn(value)
    }
}

function singleDecimal(number) {
    return (Math.round(number * 10) / 10).toFixed(1)
}
