import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Day as DayElement } from 'components/time'
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
    date: PropTypes.instanceOf(Date).isRequired,
    alp: PropTypes.oneOf(Array.from(Ratings)).isRequired,
    tln: PropTypes.oneOf(Array.from(Ratings)).isRequired,
    btl: PropTypes.oneOf(Array.from(Ratings)).isRequired,
    mountain: PropTypes.bool,
}

export default function Day({ date, mountain, ...ratings }) {
    const [{ width }, ref] = useClientRect({ width: window.innerWidth })

    return (
        <section ref={ref} className={Styles.Day}>
            <header className={Styles.Title}>
                <DayElement value={date} />
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
    const ratingText = useRatingText(rating)
    const elevationText = useElevationText(elevation)
    const elevationStyle = classnames(
        Styles.Elevation,
        ElevationStyles[elevation]
    )
    const ratingStyle = classnames(Styles.Rating, RatingStyles[rating])

    // TODO Could be moved to a Description List: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dl

    return (
        <div className={Styles.Row}>
            <div className={elevationStyle}>{elevationText}</div>
            <div className={ratingStyle}>{ratingText}</div>
        </div>
    )
}
