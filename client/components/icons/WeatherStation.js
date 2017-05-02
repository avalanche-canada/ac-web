import React from 'react'
import weatherStation from './weather-station.svg'

export default function WeatherStation({ width = 24, height = 24, ...props }) {
    return <img width={width} height={height} {...props} src={weatherStation} />
}
