import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import { withContext } from 'recompose'
import Synopsis from './Synopsis'
import DaySet from './DaySet'
import TabSet from './TabSet'
import Outlook from './Outlook'
import Footer from './Footer'
import { Text } from '../prismic'
import styles from './Forecast.css'

Forecast.propTypes = {
	forecast: PropTypes.object.isRequired,
	faq: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
}

function Forecast({ forecast, isAuthenticated = false }) {
	const date = forecast.getDate('weather-forecast.date')

	return (
		<section id='news-blog-event-landing-body' styleName='Container'>
			<Text document={forecast} fragment='weather-forecast.headline' component='h1' />
            <TabSet />
			<DaySet start={date} />
			<Outlook />
            <Footer showFeedbackAnchor={isAuthenticated} />
		</section>
	)
}

const childContextTypes = {
	forecast: PropTypes.object.isRequired,
    faq: PropTypes.object.isRequired,
}

function getChildContext(props) {
	return {
		forecast: props.forecast,
        faq: props.faq,
	}
}

export default withContext(
    childContextTypes, getChildContext
)(CSSModules(Forecast, styles))
