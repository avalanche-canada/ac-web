import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import styles from './Forecast.css'

// TODO: Could use node-url here!

const MAILTO = 'mailto:ec.cpipchefdesoperations-pspcheadofoperations.ec@canada.ca?subject=Mountain Weather Forecast feedback'

ForecastFooter.propTypes = {
    showFeedbackAnchor: PropTypes.bool
}

function ForecastFooter({ showFeedbackAnchor = false }) {
	return (
		<footer styleName='Footer'>
			Forecasts and graphics produced by Meteorological Service of Canada (MSC){' '}
			{showFeedbackAnchor &&
                <a href={MAILTO}>Send MSC feedback</a>
            }
		</footer>
	)
}

export default CSSModules(ForecastFooter, styles)
