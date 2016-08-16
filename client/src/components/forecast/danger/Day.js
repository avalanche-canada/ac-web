import React, {PropTypes, Children, cloneElement} from 'react'
import CSSModules from 'react-css-modules'
import MediaQuery from 'react-responsive'
import styles from './Danger.css'
import * as ELEVATIONS from 'constants/forecast/elevation'
import * as RATINGS from 'constants/forecast/danger/rating'
import {asMap, asValues} from 'constants/utils'
import {Day as DayElement} from 'components/misc'
import {DangerCard} from 'components/graphics'

const ELEVATION_TEXTS = asMap(ELEVATIONS.VALUES, ELEVATIONS.TEXTS)
const ELEVATION_PALETTE = asMap(ELEVATIONS.VALUES, ELEVATIONS.PALETTE)
const RATING_TEXTS = asMap(RATINGS.VALUES, RATINGS.TEXTS)
const RATING_PALETTE = asMap(RATINGS.VALUES, RATINGS.PALETTE)

const {ALP, TLN, BTL} = ELEVATIONS.VALUES

function Cell({rating}) {
    const style = {
        backgroundColor: RATING_PALETTE.get(rating)
    }

    return (
        <td style={style} styleName='Cell'>
            {RATING_TEXTS.get(rating)}
        </td>
    )
}
Cell = CSSModules(Cell, styles)

function RowHeader({rating, type}) {
    const style = {
        backgroundColor: ELEVATION_PALETTE.get(type)
    }

    return (
        <th scope='row' style={style} styleName='RowHeader'>
            {ELEVATION_TEXTS.get(type)}
        </th>
    )
}
RowHeader = CSSModules(RowHeader, styles)

function Row(props) {
    return (
        <tr>
            <RowHeader {...props} />
            <Cell {...props} />
        </tr>
    )
}

function ColumnHeader({date, colSpan = 2}) {
    return (
        <tr>
            <th scope='column' colSpan={colSpan} styleName='ColumnHeader'>
                <DayElement value={date} />
            </th>
        </tr>
    )
}
ColumnHeader = CSSModules(ColumnHeader, styles)

function Body({date, alp, tln, btl}) {
    return (
        <tbody>
            <ColumnHeader date={date} />
            <Row rating={alp} type={ALP} />
            <Row rating={tln} type={TLN} />
            <Row rating={btl} type={BTL} />
        </tbody>
    )
}

const ratingPropType = PropTypes.oneOf(asValues(RATINGS.VALUES)).isRequired

Day.propTypes = {
    date: PropTypes.instanceOf(Date).isRequired,
    index: PropTypes.number,
    alp: ratingPropType,
    tln: ratingPropType,
    btl: ratingPropType,
}

function CardRow({showTravelAdvice, ...ratings}) {
    return (
        <tr>
            <td style={{padding:0}} colSpan={2}>
                <DangerCard {...ratings} showTravelAdvice={showTravelAdvice} />
            </td>
        </tr>
    )
}

export default function Day({index, ...day}) {
    const {date, alp, tln, btl} = day

    switch (index) {
        case 0:
            return (
                <tbody>
                    <ColumnHeader date={date} />
                    <MediaQuery maxWidth={500} >
                        <Row rating={alp} type={ALP} />
                    </MediaQuery>
                    <MediaQuery maxWidth={500} >
                        <Row rating={tln} type={TLN} />
                    </MediaQuery>
                    <MediaQuery maxWidth={500} >
                        <Row rating={btl} type={BTL} />
                    </MediaQuery>
                    <MediaQuery minWidth={501} maxWidth={800} >
                        <CardRow {...{alp, tln, btl}} />
                    </MediaQuery>
                    <MediaQuery minWidth={801} >
                        <CardRow {...{alp, tln, btl, showTravelAdvice: true}} />
                    </MediaQuery>
                </tbody>
            )
        case 1:
            return (
                <Body {...day} />
        )
        case 2:
            return (
                <Body {...day} />
        )
        default:
            return null
    }
}
