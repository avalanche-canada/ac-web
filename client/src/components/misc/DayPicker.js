import React from 'react'
import {compose, withProps} from 'recompose'
import DayPicker, {WeekdayPropTypes, NavbarPropTypes} from 'react-day-picker'
import {Previous, Next} from 'components/icons'
import Button, {SUBTILE} from 'components/button'
import 'react-day-picker/lib/style.css'
import './DayPicker.css'

Weekday.propTypes = WeekdayPropTypes

function Weekday({weekday, className, localeUtils, locale}) {
    const weekdayName = localeUtils.formatWeekdayLong(weekday, locale)

    return (
        <div className={className} title={weekdayName}>
            {weekdayName.slice(0, 1)}
        </div>
    )
}

Navbar.propTypes = NavbarPropTypes

function Navbar({nextMonth, previousMonth, onPreviousClick, onNextClick, className, localeUtils}) {
    const months = localeUtils.getMonths()
    const previous = {
         kind: SUBTILE,
         title: months[previousMonth.getMonth()],
         style: {float: 'left'},
         icon: <Previous />,
         onClick: event => {
             event.preventDefault()
             onPreviousClick()
         },
    }
    const next = {
         kind: SUBTILE,
         title: months[nextMonth.getMonth()],
         style: {float: 'right'},
         icon: <Next />,
         onClick: event => {
             event.preventDefault()
             onNextClick()
         },
    }

    return (
        <div className={className}>
            <Button {...previous} />
            <Button {...next} />
        </div>
    )
}


export default compose(
    withProps({
        weekdayElement: <Weekday />,
        navbarElement: <Navbar />,
    })
)(DayPicker)
