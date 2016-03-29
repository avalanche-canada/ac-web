import React from 'react'
import Button from '../components/button'
import { pure, compose, withState, mapProps } from 'recompose'

function ForecastFooter({ href, onClick, text }) {
	return (
		<footer>
			Forecasts and graphics produced by Environment Canada
			{' '}
			<a {...{href, onClick}}>{text}</a>
		</footer>
	)
}

const HASH = '#'
const MAILTO = 'mailto:ec@canada.ca?subject=Mountain Weather Forecast feedback'

export default compose(
	withState('href', 'setHref', HASH),
	mapProps(({ setHref, href }) => ({
		onClick: event => {
			if (href !== HASH) {
				return
			}

			event.preventDefault()
			setHref(MAILTO)
		},
		text: href === HASH ? 'Send us feedback' : '[Click again] Send us feedback',
		href
	})),
	pure
)(ForecastFooter)
