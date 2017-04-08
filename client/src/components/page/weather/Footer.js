import React from 'react'
import PropTypes from 'prop-types'
import {compose} from 'recompose'
import {onlyUpdateForKey} from 'compose'
import CSSModules from 'react-css-modules'
import styles from './Weather.css'
import {Mailto} from 'components/misc'

Footer.propTypes = {
    showFeedbackAnchor: PropTypes.bool
}

function Footer({showFeedbackAnchor = false}) {
	return (
		<footer styleName='Footer'>
			Forecasts and graphics produced by the Meteorological Service of Canada (MSC){' '}
			{showFeedbackAnchor &&
                <Mailto
                    email='ec.cpip-mwf-pspc.ec@canada.ca'
                    subject='Mountain Weather Forecast Feedback'>
                    Send feedback to MSC
                </Mailto>
            }
		</footer>
	)
}

export default compose(
    onlyUpdateForKey('showFeedbackAnchor'),
    CSSModules(styles),
)(Footer)
