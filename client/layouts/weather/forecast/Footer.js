import React, { useContext } from 'react'
import styles from './Forecast.css'
import { Mailto } from 'components/anchors'
import AuthContext from 'contexts/auth'

export default function Footer() {
    const { isAuthenticated } = useContext(AuthContext)

    return (
        <footer className={styles.Footer}>
            <p>
                Forecasts and graphics produced by the Meteorological Service of
                Canada (MSC)
            </p>
            {isAuthenticated && (
                <Mailto
                    email="ec.cpip-mwf-pspc.ec@canada.ca"
                    subject="Mountain Weather Forecast Feedback">
                    Send feedback to MSC
                </Mailto>
            )}
        </footer>
    )
}
