import React from 'react'
import styles from './Forecast.css'
import { Mailto } from 'components/anchors'
import { useAuth } from 'contexts/auth'

export default function Footer() {
    const { isAuthenticated } = useAuth()

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
