import React from 'react'
import { pure } from 'recompose'

const MAILTO = 'mailto:ec@canada.ca?subject=Mountain Weather Forecast feedback'

function ForecastFooter({ href, onClick, text }) {
	return (
		<footer>
			Forecasts and graphics produced by Environment Canada
			{' '}
			<a href={MAILTO}>Send us feedback</a>
		</footer>
	)
}

export default pure(ForecastFooter)
