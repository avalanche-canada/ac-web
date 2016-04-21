import React from 'react'
import range from 'lodash.range'
import { Html, Image } from '../prismic'
import getForecast from './getForecast'

const sequence = [1, 2, 3, 4]

function Outlook({ forecast }) {
	const outlook = forecast.get('weather-forecast.outlook')
	const image1 = forecast.get('weather-forecast.outlook-image1')
	const text1 = forecast.get('weather-forecast.outlook-text1')

	if (outlook === null) {
		return null
	}

	return (
		<section>
			<h2>Outlook</h2>
			<Html fragment='weather-forecast.outlook' />
			{sequence.map(increment => (
				<div key={increment}>
					<Image document={forecast} fragment={`weather-forecast.outlook-image${increment}`} openNewTab />
					<Html document={forecast} fragment={`weather-forecast.outlook-text${increment}`} />
				</div>
			))}
		</section>
	)
}

export default getForecast(Outlook)
