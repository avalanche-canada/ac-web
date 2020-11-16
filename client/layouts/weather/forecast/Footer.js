import React from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { useAuth } from 'contexts/auth'
import { Mailto } from 'components/anchors'
import styles from './Forecast.module.css'

export default function Footer() {
    const { isAuthenticated } = useAuth()
    const intl = useIntl()
    const subject = intl.formatMessage({
        description: 'Layout weather/forecast/Footer',
        defaultMessage: 'Mountain Weather Forecast Feedback',
    })

    return (
        <footer className={styles.Footer}>
            <p>
                <FormattedMessage
                    description="Layout weather/forecast/Footer"
                    defaultMessage="Forecasts and graphics produced by the Meteorological Service of
                        Canada (MSC)"
                />
            </p>
            {isAuthenticated && (
                <Mailto email="ec.cpip-mwf-pspc.ec@canada.ca" subject={subject}>
                    <FormattedMessage
                        description="Layout weather/forecast/Footer"
                        defaultMessage="Send feedback to Meteorological Service of Canada"
                    />
                </Mailto>
            )}
        </footer>
    )
}
