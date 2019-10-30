import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Day as DayElement } from 'components/time'
import {
    ALP,
    TLN,
    BTL,
    Texts as ElevationTexts,
    Palette as ElevationPalette,
} from 'constants/forecast/elevation'
import Ratings, {
    EXTREME,
    Texts as RatingTexts,
    Palette as RatingPalette,
} from 'constants/forecast/rating'
import { WHITE, BLACK } from 'constants/forecast/palette'
import DangerCard from 'components/graphics/danger'
import { useClientRect } from 'hooks'
import styles from './Danger.css'

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
        <section ref={ref} className={styles.Day}>
            <header className={styles.Title}>
                <DayElement value={date} />
            </header>
            {mountain && width > 400 ? (
                <DangerCard
                    {...ratings}
                    showTravelAdvice={width > 600}
                    showExtraInformation={width > 650}
                />
            ) : (
                <Fragment>
                    <Row rating={ratings.alp} elevation={ALP} />
                    <Row rating={ratings.tln} elevation={TLN} />
                    <Row rating={ratings.btl} elevation={BTL} />
                </Fragment>
            )}
        </section>
    )
}

// Utils
function Row({ rating, elevation }) {
    const elevationStyle = {
        backgroundColor: ElevationPalette.get(elevation),
    }
    const ratingStyle = {
        backgroundColor: RatingPalette.get(rating),
        color: rating === EXTREME ? WHITE : BLACK,
    }

    return (
        <div className={styles.Row}>
            <div style={elevationStyle} className={styles.Elevation}>
                {ElevationTexts.get(elevation)}
            </div>
            <div style={ratingStyle} className={styles.Rating}>
                {RatingTexts.get(rating)}
            </div>
        </div>
    )
}
