import React, {PropTypes} from 'react'
import {compose, withState} from 'recompose'
import moment from 'moment'
import CSSModules from 'react-css-modules'
import {Input} from 'components/controls'
import styles from './DateRange.css'
import {DayPicker, DateUtils} from 'components/misc'

function K() {}

DateRange.propTypes = {
    from: PropTypes.instanceOf(Date).isRequired,
    to: PropTypes.instanceOf(Date).isRequired,
    onChange: PropTypes.func.isRequired,
}

function DateRange({onChange = K, focus, setFocus, ...range}) {
    function handleInputChange({target}) {
        const {value, name} = target
        const range = {from, to}

        range[name] = value

        onChange(range)
    }
    function handleFocus({target}) {
        setFocus(target.name)
    }
    function handleDayClick(day) {
        const range = DateUtils.addDayToRange(day, {from, to})

        onChange(range)

        // setFocus(null)
    }

    const {from, to} = range

    return (
        <div styleName='Container'>
            <div styleName='InputSet'>
                <Input type='text' placeholder='Start date' name='from' value={from} onChange={handleInputChange} onFocus={handleFocus} />
                <Input type='text' placeholder='End date' name='to' value={to} onChange={handleInputChange} onFocus={handleFocus} />
            </div>
            {focus &&
                <DayPicker selectedDays={day => DateUtils.isDayInRange(day, range)} onDayClick={handleDayClick} />
            }
        </div>
    )
}

export default compose(
    withState('focus', 'setFocus', null)
)(CSSModules(DateRange, styles))
