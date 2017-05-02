import React from 'react'
import { withProps } from 'recompose'
import DayPicker, { WeekdayPropTypes, NavbarPropTypes } from 'react-day-picker'
import { Previous, Next } from '~/components/icons'
import Button, { SUBTILE } from '~/components/button'
import classNames from './DayPicker.css'

Weekday.propTypes = WeekdayPropTypes

function Weekday({ weekday, className, localeUtils, locale }) {
    const weekdayName = localeUtils.formatWeekdayLong(weekday, locale)

    return (
        <div className={className} title={weekdayName}>
            {weekdayName.slice(0, 1)}
        </div>
    )
}

Navbar.propTypes = NavbarPropTypes

function Navbar({
    showNextButton,
    nextMonth,
    showPreviousButton,
    previousMonth,
    onPreviousClick,
    onNextClick,
    className,
    localeUtils,
}) {
    const months = localeUtils.getMonths()
    const previous = {
        kind: SUBTILE,
        title: months[previousMonth.getMonth()],
        className: classNames.navButtonPrev,
        icon: <Previous />,
        onClick: event => {
            event.preventDefault()
            onPreviousClick()
        },
    }
    const next = {
        kind: SUBTILE,
        title: months[nextMonth.getMonth()],
        className: classNames.navButtonNext,
        icon: <Next />,
        onClick: event => {
            event.preventDefault()
            onNextClick()
        },
    }

    return (
        <div className={className}>
            {showPreviousButton && <Button {...previous} />}
            {showNextButton && <Button {...next} />}
        </div>
    )
}

export default withProps({
    weekdayElement: Weekday,
    navbarElement: Navbar,
    classNames,
})(DayPicker)
