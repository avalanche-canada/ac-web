import React from 'react'
import PropTypes from 'prop-types'
import Forecast from './Forecast'
import Legacy from './Legacy'
import styles from './Forecast.css'

export Loop, { Warning } from './Loop'
export Image from 'components/loop'

Index.propTypes = {
    forecast: PropTypes.object.isRequired,
}

export default function Index(props) {
    const { forecast } = props

    return (
        <section className={styles.Index}>
            <h2 className={styles.Headline}>{forecast.headline}</h2>
            {forecast.isLegacy ? (
                <Legacy forecast={forecast} />
            ) : (
                <Forecast forecast={forecast} />
            )}
        </section>
    )
}
