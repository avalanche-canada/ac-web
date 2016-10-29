export const Hour = {
    name: 'hour',
    title: 'Hour',
    property({measurementDateTime}) {
        const date = new Date(measurementDateTime)

        return `${date.getHours()}h`
    },
}

export const SnowHeight = {
    name: 'snowHeight',
    title: 'Snow Height (cm)',
    property: 'snowHeight',
}

export const AirTemperatureAvg = {
    name: 'airTempAvg',
    title: 'Air Temperature Average (°C)',
    property: 'airTempAvg',
}

export const AirTemperatureMax = {
    name: 'airTempMax',
    title: 'Air Temperature Max (°C)',
    property: 'airTempMax',
}

export const AirTemperatureMin = {
    name: 'airTempMin',
    title: 'Air Temperature Min (°C)',
    property: 'airTempMin',
}

export const WindSpeedAvg = {
    name: 'windSpeedAvg',
    title: 'Wind Speed Average (km/h)',
    property: 'windSpeedAvg',
}

export const WindDirectionAvg = {
    name: 'windDirAvg',
    title: 'Wind Direction Average (km/h)',
    property: 'windDirAvg',
}

export const WindSpeedGust = {
    name: 'windSpeedGust',
    title: 'Wind Speed Gust (km/h)',
    property: 'windSpeedGust',
}

export const RelativeHumidity = {
    name: 'relativeHumidity',
    title: 'Relative Humidity (%)',
    property: 'relativeHumidity',
}
