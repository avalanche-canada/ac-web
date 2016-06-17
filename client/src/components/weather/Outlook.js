import React from 'react'
import range from 'lodash.range'
import { Html, Image } from 'prismic'

const sequence = [1, 2, 3, 4]

export default function Outlook({ forecast }) {
	const outlook = forecast.get('${forecast.type}.outlook')

	if (outlook === null) {
		return null
	}

	return (
		<section>
			<h2>Outlook</h2>
			<Html document={forecast} fragment='${forecast.type}.outlook' />
			{sequence.map(increment => (
				<div key={increment}>
					<Image document={forecast} fragment={`${forecast.type}.outlook-image${increment}`} openNewTab />
					<Html document={forecast} fragment={`${forecast.type}.outlook-text${increment}`} />
				</div>
			))}
		</section>
	)
}
