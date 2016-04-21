import React, { PropTypes } from 'react'
import { Html, Image, getDocument } from '../prismic'
import { format } from './utils/Date'

Day.propTypes = {
	date: PropTypes.instanceOf(Date).isRequired,
	index: PropTypes.oneOf([0, 1, 2, 3]).isRequired,
}

const sequence = [1, 2, 3, 4]

function Day({ document, date, index }) {
	function get(type, increment) {
		return document.get(`weather-forecast.day${index+1}-${type}${increment}`)
	}

	if (!get('image', 1) && !get('text', 1)) {
		return null
	}

	return (
		<section>
			<h2>{format(date)}</h2>
			{sequence.map(increment => (
				<div key={increment}>
					<Image fragment={`weather-forecast.day${index+1}-image${increment}`} />
					<Html fragment={`weather-forecast.day${index+1}-text${increment}`} />
				</div>
			))}
		</section>
	)
}

export default getDocument(Day)
