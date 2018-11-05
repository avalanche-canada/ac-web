import React, { Component } from 'react'
import styles from './Forecast.css'
import { Mailto } from 'components/anchors'
import AuthContext from 'contexts/auth'

export default class Footer extends Component {
    static contextType = AuthContext
    render() {
        return (
            <footer className={styles.Footer}>
                <p>
                    Forecasts and graphics produced by the Meteorological
                    Service of Canada (MSC)
                </p>
                {this.context.isAuthenticated && (
                    <Mailto
                        email="ec.cpip-mwf-pspc.ec@canada.ca"
                        subject="Mountain Weather Forecast Feedback">
                        Send feedback to MSC
                    </Mailto>
                )}
            </footer>
        )
    }
}
