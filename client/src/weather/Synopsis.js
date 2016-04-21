import React from 'react'
import getForecast from './getForecast'
import SliceZone from './SliceZone'

function Synopsis({ forecast }) {
    const zone = forecast.get('weather-forecast.synopsis')

	return (
        <SliceZone zone={zone} />
    )
}

export default getForecast(Synopsis)
