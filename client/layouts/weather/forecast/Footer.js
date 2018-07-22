import React, { Component } from 'react'
import styles from './Forecast.css'
import { Mailto } from 'components/anchors'
import * as Auth from 'contexts/auth'

export default class Footer extends Component {
    mailto({ isAuthenticated }) {
        return isAuthenticated ? (
            <Mailto
                email="ec.cpip-mwf-pspc.ec@canada.ca"
                subject="Mountain Weather Forecast Feedback">
                Send feedback to MSC
            </Mailto>
        ) : null
    }
    render() {
        return (
            <footer className={styles.Footer}>
                <p>
                    Forecasts and graphics produced by the Meteorological
                    Service of Canada (MSC)
                </p>
                <Auth.Consumer>{this.mailto}</Auth.Consumer>
            </footer>
        )
    }
}
