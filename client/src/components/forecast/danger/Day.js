import React, {PropTypes, Children, cloneElement} from 'react'
import {branch, renderComponent} from 'recompose'
import CSSModules from 'react-css-modules'
import {ElementResize} from 'components/misc'
import styles from './Danger.css'
import {
    ALP,
    TLN,
    BTL,
    Texts as ElevationTexts,
    Palette as ElevationPalette
} from 'constants/forecast/elevation'
import Ratings, {Texts as RatingTexts, Palette as RatingPalette} from 'constants/forecast/rating'
import {Day as DayElement} from 'components/misc'
import {DangerCard} from 'components/graphics'

function Row({rating, elevation}) {
    const elevationStyle = {
        backgroundColor: ElevationPalette.get(elevation)
    }
    const ratingStyle = {
        backgroundColor: RatingPalette.get(rating)
    }

    return (
        <div styleName='Row'>
            <div style={elevationStyle} styleName='Elevation'>
                {ElevationTexts.get(elevation)}
            </div>
            <div style={ratingStyle} styleName='Rating'>
                {RatingTexts.get(rating)}
            </div>
        </div>
    )
}

Row = CSSModules(Row, styles)

function Title({date}) {
    return (
        <div styleName='Title'>
            <DayElement value={date} />
        </div>
    )
}

Title = CSSModules(Title, styles)

Day.propTypes = {
    date: PropTypes.instanceOf(Date).isRequired,
    alp: PropTypes.oneOf(Array.from(Ratings)).isRequired,
    tln: PropTypes.oneOf(Array.from(Ratings)).isRequired,
    btl: PropTypes.oneOf(Array.from(Ratings)).isRequired,
}

function Day({date, alp, tln, btl}) {
    return (
        <div styleName='Day'>
            <Title date={date} />
            <Row rating={alp} elevation={ALP} />
            <Row rating={tln} elevation={TLN} />
            <Row rating={btl} elevation={BTL} />
        </div>
    )
}

FirstDay.propTypes = Day.propTypes

function FirstDay({date, ...ratings}) {
    return (
        <div styleName='FirstDay'>
            <ElementResize>
                {width => {
                    const children = [<Title key='title' date={date} />]

                    if (width < 400) {
                        children.push(<Row key='alp' rating={ratings.alp} elevation={ALP} />)
                        children.push(<Row key='tln' rating={ratings.tln} elevation={TLN} />)
                        children.push(<Row key='btl' rating={ratings.btl} elevation={BTL} />)
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
            </ElementResize>
        </div>
    )
}

export default branch(
    props => props.first,
    renderComponent(CSSModules(FirstDay, styles)),
)(CSSModules(Day, styles))
