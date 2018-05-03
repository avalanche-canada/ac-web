import React, { PureComponent } from 'react'
import Base, { WeekdayPropTypes, NavbarPropTypes } from 'react-day-picker'
import { Previous, Next } from 'components/icons'
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

class Navbar extends PureComponent {
    static propTypes = NavbarPropTypes
    months = this.props.localeUtils.getMonths()
    handlePreviousClick = event => {
        event.preventDefault()
        this.props.onPreviousClick()
    }
    handleNextClick = event => {
        event.preventDefault()
        this.props.onNextClick()
    }
    get previous() {
        return (
            <Button
                kind={SUBTILE}
                title={this.months[this.props.previousMonth.getMonth()]}
                className={styles.navButtonPrev}
                onClick={this.handlePreviousClick}>
                <Previous />
            </Button>
        )
    }
    get next() {
        return (
            <Button
                kind={SUBTILE}
                title={this.months[this.props.nextMonth.getMonth()]}
                className={styles.navButtonNext}
                onClick={this.handleNextClick}>
                <Next />
            </Button>
        )
    }
    render() {
        const { className, showPreviousButton, showNextButton } = this.props

        return (
            <div className={className}>
                {showPreviousButton && this.previous}
                {showNextButton && this.next}
            </div>
        )
    }
}

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
