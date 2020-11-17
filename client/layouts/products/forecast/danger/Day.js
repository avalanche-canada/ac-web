import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Time from 'components/time/Time'
import ELEVATIONS, {
    useText as useElevationText,
} from 'constants/forecast/elevation'
import Ratings, { useText as useRatingText } from 'constants/forecast/rating'
import DangerCard from 'components/graphics/danger'
import { useClientRect } from 'hooks'
import Styles from './Danger.css'
import RatingStyles from 'styles/forecasts/ratings.css'
import ElevationStyles from 'styles/forecasts/elevations.css'

Day.propTypes = {
    date: PropTypes.shape({
        value: PropTypes.instanceOf(Date).isRequired,
        display: PropTypes.string.isRequired,
    }).isRequired,
    alp: PropTypes.shape({
        value: PropTypes.oneOf(Array.from(Ratings)).isRequired,
        display: PropTypes.string.isRequired,
    }).isRequired,
    tln: PropTypes.shape({
        value: PropTypes.oneOf(Array.from(Ratings)).isRequired,
        display: PropTypes.string.isRequired,
    }).isRequired,
    btl: PropTypes.shape({
        value: PropTypes.oneOf(Array.from(Ratings)).isRequired,
        display: PropTypes.string.isRequired,
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
                Array.from(ELEVATIONS).map(elevation => (
                    <Row
                        key={elevation}
                        rating={ratings[elevation]}
                        elevation={elevation}
                    />
                ))
            )}
        </section>
    )
}

// Utils
function Row({ rating, elevation }) {
    const { value, display } = rating
    const elevationText = useElevationText(elevation)
    const elevationStyle = classnames(
        Styles.Elevation,
        ElevationStyles[elevation]
    )
    const ratingStyle = classnames(Styles.Rating, RatingStyles[value])

    // TODO Could be moved to a Description List: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dl

    return (
        <div className={Styles.Row}>
            <div className={elevationStyle}>{elevationText}</div>
            <div className={ratingStyle}>{display}</div>
        </div>
    )
}
