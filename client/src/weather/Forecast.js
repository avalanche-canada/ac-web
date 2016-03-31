import React, { PropTypes } from 'react'
import { withContext } from 'recompose'
import DaySet from './DaySet'
import TabSet from './TabSet'
import Outlook from './Outlook'
import Footer from './Footer'
import { Html, Text } from '../prismic'

Forecast.propTypes = {
	content: PropTypes.object.isRequired
}

function Forecast({ content }) {
	const date = content.getDate('weather-forecast.date')

	return (
		<section id='news-blog-event-landing-body'>
			<Text fragment='weather-forecast.headline' component='h1' />
			<Html fragment='weather-forecast.synopsis' />
			<TabSet />
			<DaySet start={date} />
			<Outlook />
		</section>
	)
}

const childContextTypes = {
	document: PropTypes.object.isRequired
}
function getChildContext(props) {
	return {
		document: props.content
	}
}

export default withContext(childContextTypes, getChildContext, Forecast)
