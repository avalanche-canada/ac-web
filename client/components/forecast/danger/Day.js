import React from 'react'
import PropTypes from 'prop-types'
import Dimensions from 'components/Dimensions'
import { Day as DayElement } from 'components/time'
import styles from './Danger.css'
import Elevations, {
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
import { DangerCard } from 'components/graphics'

const RatingPropType = PropTypes.oneOf(Array.from(Ratings))

Row.propTypes = {
    rating: RatingPropType.isRequired,
    elevation: PropTypes.oneOf(Array.from(Elevations)).isRequired,
}

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

Title.propTypes = {
    date: PropTypes.instanceOf(Date).isRequired,
}

function Title({ date }) {
    return (
        <div className={styles.Title}>
            <DayElement value={date} />
        </div>
    )
}

Day.propTypes = {
    date: PropTypes.instanceOf(Date).isRequired,
    alp: RatingPropType.isRequired,
    tln: RatingPropType.isRequired,
    btl: RatingPropType.isRequired,
}

export default function Day({ date, alp, tln, btl }) {
    return (
        <div className={styles.Day}>
            <Title date={date} />
            <Row rating={alp} elevation={ALP} />
            <Row rating={tln} elevation={TLN} />
            <Row rating={btl} elevation={BTL} />
        </div>
    )
}

FirstDay.propTypes = {
    date: PropTypes.instanceOf(Date).isRequired,
    alp: RatingPropType.isRequired,
    tln: RatingPropType.isRequired,
    btl: RatingPropType.isRequired,
}

export function FirstDay(props) {
    const { date, ...ratings } = props

    return (
        <div className={styles.FirstDay}>
            <Dimensions>
                {({ width }) => {
                    const children = [<Title key="title" date={date} />]

                    if (width < 400) {
                        children.push(
                            <Row
                                key="alp"
                                rating={ratings.alp}
                                elevation={ALP}
                            />
                        )
                        children.push(
                            <Row
                                key="tln"
                                rating={ratings.tln}
                                elevation={TLN}
                            />
                        )
                        children.push(
                            <Row
                                key="btl"
                                rating={ratings.btl}
                                elevation={BTL}
                            />
                        )
                    } else {
                        const props = {
                            key: 'card',
                            ...ratings,
                            showTravelAdvice: width > 600,
                            showExtraInformation: width > 650,
                        }

                        children.push(<DangerCard {...props} />)
                    }

                    return children
                }}
            </Dimensions>
        </div>
    )
}
