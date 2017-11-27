import React from 'react'
import PropTypes from 'prop-types'
import styles from './Weather.css'
import { Mailto } from 'components/anchors'

Footer.propTypes = {
    showFeedbackAnchor: PropTypes.bool,
}

export default function Footer({ showFeedbackAnchor = false }) {
    return (
        <footer className={styles.Footer}>
            Forecasts and graphics produced by the Meteorological Service of
            Canada (MSC){' '}
            {showFeedbackAnchor && (
                <Mailto
                    email="ec.cpip-mwf-pspc.ec@canada.ca"
                    subject="Mountain Weather Forecast Feedback">
                    Send feedback to MSC
                </Mailto>
            )}
        </footer>
    )
}
