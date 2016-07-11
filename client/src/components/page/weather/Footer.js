import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import styles from './Weather.css'
import { Mailto } from 'components/misc'

const email = 'ec.cpipchefdesoperations-pspcheadofoperations.ec@canada.ca'
const subject = 'Mountain Weather Forecast Feedback'

Footer.propTypes = {
    showFeedbackAnchor: PropTypes.bool
}

function Footer({ showFeedbackAnchor = false }) {
	return (
		<footer styleName='Footer'>
			Forecasts and graphics produced by the Meteorological Service of Canada (MSC){' '}
			{showFeedbackAnchor &&
                <Mailto {...{email, subject}}>
                    Send feedback to MSC
                </Mailto>
            }
		</footer>
	)
}

export default CSSModules(Footer, styles)
