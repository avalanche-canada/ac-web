import React, { PropTypes } from 'react'
import { Html, Image } from 'prismic'
import {DateElement} from 'components/misc'

Day.propTypes = {
	date: PropTypes.instanceOf(Date).isRequired,
	index: PropTypes.oneOf([0, 1, 2, 3]).isRequired,
    forecast: PropTypes.object
}

const sequence = [1, 2, 3, 4]

export default function Day({ forecast, date, index }) {
	function get(type, increment) {
		return forecast.get(`${forecast.type}.day${index+1}-${type}${increment}`)
	}

	if (!get('image', 1) && !get('text', 1)) {
		return null
	}

	return (
		<section>
			<h2>
                <DateElement value={date} />
            </h2>
			{sequence.map(increment => (
				<div key={increment}>
					<Image document={forecast} fragment={`${forecast.type}.day${index+1}-image${increment}`} />
					<Html document={forecast} fragment={`${forecast.type}.day${index+1}-text${increment}`} />
				</div>
			))}
		</section>
	)
}
