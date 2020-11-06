export function createHour(intl) {
    return {
        name: 'hour',
        title: intl.formatMessage({
            description: 'Component weather/station/headers',
            defaultMessage: 'Hour',
        }),
        rowSpan: 2,
    }
}

export function createAirTemperature(intl) {
    return {
        name: 'air-temperature',
        title: intl.formatMessage({
            description: 'Component weather/station/headers',
            defaultMessage: 'Air Temperature (°C)',
        }),
        colSpan: 1,
    }
}

export function createWind(intl) {
    return {
        name: 'wind',
        title: intl.formatMessage({
            description: 'Component weather/station/headers',
            defaultMessage: 'Wind (km/h)',
        }),
        colSpan: 3,
    }
}

export function createRelativeHumidity(intl) {
    return {
        name: 'relative-humidity',
        title: intl.formatMessage({
            description: 'Component weather/station/headers',
            defaultMessage: 'RH (%)',
        }),
        rowSpan: 2,
        style: {
            whiteSpace: 'normal',
        },
    }
}

export function createSnow(intl) {
    return {
        name: 'snow',
        title: intl.formatMessage({
            description: 'Component weather/station/headers',
            defaultMessage: 'Snow (cm)',
        }),
        colSpan: 2,
        style: {
            whiteSpace: 'normal',
        },
    }
}

export function createSnowHeight(intl) {
    return {
        name: 'snow-height',
        title: intl.formatMessage({
            description: 'Component weather/station/headers',
            defaultMessage: 'Height',
        }),
    }
}

export function createNewSnow(intl) {
    return {
        name: 'new-snow',
        title: intl.formatMessage({
            description: 'Component weather/station/headers',
            defaultMessage: 'New',
        }),
    }
}

export function createAirTemperatureAvg(intl) {
    return {
        name: 'airTempAvg',
        title: intl.formatMessage({
            description: 'Component weather/station/headers',
            defaultMessage: 'Average',
        }),
    }
}

export function createAirTemperatureMax(intl) {
    return {
        name: 'airTempMax',
        title: intl.formatMessage({
            description: 'Component weather/station/headers',
            defaultMessage: 'Max',
        }),
    }
}

export function createAirTemperatureMin(intl) {
    return {
        name: 'airTempMin',
        title: intl.formatMessage({
            description: 'Component weather/station/headers',
            defaultMessage: 'Min',
        }),
    }
}

export function createWindSpeedAvg(intl) {
    return {
        name: 'windSpeedAvg',
        title: intl.formatMessage({
            description: 'Component weather/station/headers',
            defaultMessage: 'Speed',
        }),
    }
}

export function createWindDirectionAvg(intl) {
    return {
        name: 'windDirAvg',
        title: intl.formatMessage({
            description: 'Component weather/station/headers',
            defaultMessage: 'Direction',
        }),
    }
}

export function createWindSpeedGust(intl) {
    return {
        name: 'windSpeedGust',
        title: intl.formatMessage({
            description: 'Component weather/station/headers',
            defaultMessage: 'Gust',
        }),
    }
}
