import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Time from 'components/time/Time'
import ELEVATIONS from 'constants/products/forecast/elevation'
import Ratings from 'constants/products/forecast/rating'
import DangerCard from 'components/graphics/danger'
import { useClientRect } from 'hooks'
import Styles from './Danger.module.css'
import RatingStyles from 'styles/forecasts/ratings.module.css'
import ElevationStyles from 'styles/forecasts/elevations.module.css'

Day.propTypes = {
    date: PropTypes.shape({
        value: PropTypes.instanceOf(Date).isRequired,
        display: PropTypes.string.isRequired,
    }).isRequired,
    alp: PropTypes.shape({
        display: PropTypes.string.isRequired,
        rating: PropTypes.shape({
            value: PropTypes.oneOf(Array.from(Ratings)).isRequired,
            display: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
    tln: PropTypes.shape({
        display: PropTypes.string.isRequired,
        rating: PropTypes.shape({
            value: PropTypes.oneOf(Array.from(Ratings)).isRequired,
            display: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
    btl: PropTypes.shape({
        display: PropTypes.string.isRequired,
        rating: PropTypes.shape({
            value: PropTypes.oneOf(Array.from(Ratings)).isRequired,
            display: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
    mountain: PropTypes.bool,
}

export default function Day({ date, mountain, ...ratings }) {
    const [{ width }, ref] = useClientRect({ width: window.innerWidth })

    return (
        <section ref={ref} className={Styles.Day}>
            <header className={Styles.Title}>
                <Time value={date.value}>{date.display}</Time>
            </header>
            {mountain && width > 400 ? (
                <DangerCard
                    {...ratings}
                    showTravelAdvice={width > 600}
                    showExtraInformation={width > 650}
                />
            ) : (
                <DangerTable {...ratings} />
            )}
        </section>
    )
}

// Utils
function DangerTable(ratings) {
    return Array.from(ELEVATIONS, elevation => {
        const { rating, display } = ratings[elevation]

        return <Row key={elevation} rating={rating} elevation={{ value: elevation, display }} />
    })
}
function Row({ rating, elevation }) {
    const ratingStyle = classnames(Styles.Rating, RatingStyles[rating.value])
    const elevationStyle = classnames(Styles.Elevation, ElevationStyles[elevation.value])

    // TODO Could be moved to a Description List: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dl

    return (
        <div className={Styles.Row}>
            <div className={elevationStyle}>{elevation.display}</div>
            <div className={ratingStyle}>{rating.display}</div>
        </div>
    )
}
