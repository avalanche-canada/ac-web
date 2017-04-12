import React from 'react'
import weatherStation from './weather-station.svg'

function WeatherStation({width = 24, height = 24, ...props}) {
	return <img width={width} height={height} {...props} src={weatherStation} />
}

export default WeatherStation
