import React from 'react'
import { Html, Image, getDocument } from '../prismic'
import range from 'lodash.range'

const sequence = [1, 2, 3, 4]

function Outlook({ document }) {
	const outlook = document.get('weather-forecast.outlook')
	const image1 = document.get('weather-forecast.outlook-image1')
	const text1 = document.get('weather-forecast.outlook-text1')

	if (outlook === null) {
		return <noscript></noscript>
	}

	return (
		<section>
			<h2>Outlook</h2>
			<Html fragment='weather-forecast.outlook' />
			{sequence.map(increment => (
				<div key={increment}>
					<Image fragment={`weather-forecast.outlook-image${increment}`} openNewTab />
					<Html fragment={`weather-forecast.outlook-text${increment}`} />
				</div>
			))}
		</section>
	)
}

export default getDocument(Outlook)
