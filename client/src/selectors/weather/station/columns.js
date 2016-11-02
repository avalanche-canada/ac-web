import React from 'react'
import moment from 'moment'

const ARROW_STYLE = {
    float: 'right',
}

function Arrow({orientation}) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" title={`${orientation} ° from the north clockwise.`} width="16" height="16" viewBox="0 0 16 16" style={ARROW_STYLE}>
            <text x={8} y={12} rotate={orientation}>↑</text>
        </svg>
    )
}

const NO_WRAP = {
    whiteSpace: 'nowrap',
}

function NoWrap({children}) {
    return (
        <span style={NO_WRAP}>{children}</span>
    )
}

export const Hour = {
    name: 'hour',
    title: 'Hour',
    property({measurementDateTime}) {
        return moment(measurementDateTime).format('HH[h]')
    },
}

export const SnowHeight = {
    name: 'snowHeight',
    title: 'Snow Height (cm)',
    property({snowHeight}) {
        return `${snowHeight} cm`
    },
}

export const AirTemperatureAvg = {
    name: 'airTempAvg',
    title: 'Air Temperature Average',
    property({airTempAvg}) {
        return `${airTempAvg} °C`
    },
}

export const AirTemperatureMax = {
    name: 'airTempMax',
    title: 'Air Temperature Max (°C)',
    property({airTempMax}) {
        return `${airTempMax} °C`
    },
}

export const AirTemperatureMin = {
    name: 'airTempMin',
    title: 'Air Temperature Min (°C)',
    property({airTempMin}) {
        return `${airTempMin} °C`
    },
}

export const WindSpeedAvg = {
    name: 'windSpeedAvg',
    title: 'Wind Speed Average',
    property({windSpeedAvg}) {
        return `${windSpeedAvg} km/h`
    },
}

export const WindDirectionAvg = {
    name: 'windDirAvg',
    title: 'Wind Direction Average',
    property({windDirAvg}) {
        return (
            <span>
                {windDirAvg} °
                <Arrow orientation={windDirAvg} />
            </span>
        )
    },
}

export const WindSpeedGust = {
    name: 'windSpeedGust',
    title: 'Wind Speed Gust',
    property({windSpeedGust}) {
        return `${windSpeedGust} km/h`
    },
}

export const RelativeHumidity = {
    name: 'relativeHumidity',
    title: 'Relative Humidity (%)',
    property({relativeHumidity}) {
        return `${relativeHumidity} %`
    },
}
