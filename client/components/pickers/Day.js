import React, { PureComponent } from 'react'
import Base, { WeekdayPropTypes, NavbarPropTypes } from 'react-day-picker'
import { Previous, Next } from 'components/icons'
import Button, { SUBTILE } from 'components/button'
import classNames from './Day.css'

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
    constructor(props) {
        super(props)

        this.months = this.props.localeUtils.getMonths()
    }
    get previous() {
        const { onPreviousClick, previousMonth } = this.props
        const props = {
            kind: SUBTILE,
            icon: <Previous />,
            title: this.months[previousMonth.getMonth()],
            onClick(event) {
                event.preventDefault()
                onPreviousClick()
            },
        }

        return <Button {...props} />
    }
    get next() {
        const { nextMonth, onNextClick } = this.props
        const props = {
            kind: SUBTILE,
            title: this.months[nextMonth.getMonth()],
            className: classNames.navButtonNext,
            icon: <Next />,
            onClick: event => {
                event.preventDefault()
                onNextClick()
            },
        }

        return <Button {...props} />
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
            classNames={classNames}
            {...props}
        />
    )
}
