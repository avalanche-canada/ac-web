import React, { memo } from 'react'
import Base, { WeekdayPropTypes, NavbarPropTypes } from 'react-day-picker'
import { ChevronLeft, ChevronRight } from 'components/icons'
import Button, { SUBTILE } from 'components/button'
import styles from './Day.css'

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
    className,
    showPreviousButton,
    previousMonth,
    onPreviousClick,
    showNextButton,
    nextMonth,
    onNextClick,
    localeUtils,
}) {
    const MONTHS = localeUtils.getMonths()

    return (
        <div className={className}>
            {showPreviousButton && (
                <Button
                    kind={SUBTILE}
                    title={MONTHS[previousMonth.getMonth()]}
                    className={styles.navButtonPrev}
                    onClick={event => {
                        event.preventDefault()
                        onPreviousClick()
                    }}>
                    <ChevronLeft />
                </Button>
            )}
            {showNextButton && (
                <Button
                    kind={SUBTILE}
                    title={MONTHS[nextMonth.getMonth()]}
                    className={styles.navButtonNext}
                    onClick={event => {
                        event.preventDefault()
                        onNextClick()
                    }}>
                    <ChevronRight />
                </Button>
            )}
        </div>
    )
}

const Navbar = memo(Navbar)

export default function DayPicker(props) {
    return (
        <Base
            weekdayElement={Weekday}
            navbarElement={Navbar}
            classNames={styles}
            {...props}
        />
    )
}
