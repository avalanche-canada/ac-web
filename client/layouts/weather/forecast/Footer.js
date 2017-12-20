import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './Forecast.css'
import { Mailto } from 'components/anchors'
import Authenticated from 'containers/Authenticated'

Footer.propTypes = {
    children: PropTypes.node,
}

export default class Footer extends Component {
    mailto({ isAuthenticated }) {
        if (isAuthenticated) {
            return (
                <Mailto
                    email="ec.cpip-mwf-pspc.ec@canada.ca"
                    subject="Mountain Weather Forecast Feedback">
                    Send feedback to MSC
                </Mailto>
            )
        } else {
            return null
        }
    }
    render() {
        return (
            <footer className={styles.Footer}>
                <p>
                    Forecasts and graphics produced by the Meteorological
                    Service of Canada (MSC)
                </p>
                <Authenticated>{this.mailto}</Authenticated>
            </footer>
        )
    }
}
