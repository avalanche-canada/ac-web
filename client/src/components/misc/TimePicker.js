import React, {PropTypes} from 'react'
import {compose, withState, withHandlers, setPropTypes, defaultProps} from 'recompose'
import CSSModules from 'react-css-modules'
import Button, {SUBTITLE} from 'components/button'
import styles from './TimePicker.css'

function noop() {}
function padMinute(minute) {
    return Number(minute) < 10 ? '0' + minute : minute
}
function format({hour, minute}) {
    return `${hour}:${minute}`
}


function TimePicker({hour, onHourChange, minute, onMinuteChange, onKeyDown, onSetClick, onFocus, step, autoFocus}) {
    return (
        <div styleName='Container'>
            <label title='Hour' styleName='Hour'>
                <input value={hour} name='time-picker-hour' onChange={onHourChange} type='number' min='0' max='23' onKeyDown={onKeyDown} onFocus={onFocus} autoFocus={autoFocus} />
                <span styleName='Label'>Hour</span>
            </label>
            <label title='Minute' styleName='Minute'>
                <input value={minute} name='time-picker-minute' onChange={onMinuteChange} type='number' min='0' max='59' step={step} onKeyDown={onKeyDown} onFocus={onFocus} />
                <span styleName='Label'>Minute</span>
            </label>
            <Button onClick={onSetClick}>
                Done
            </Button>
        </div>
    )
}

export default compose(
    setPropTypes({
        value: PropTypes.string,
        onChange: PropTypes.func.isRequired,
        step: PropTypes.number,
        autoFocus: PropTypes.bool,
    }),
    defaultProps({
        step: 15,
        onChange: noop,
    }),
    withState('hour', 'setHour', ({value, step}) => {
        const hour = value ? value.split(':')[0] : new Date().getHours()

        return hour
    }),
    withState('minute', 'setMinute', ({value, step}) => {
        const minute =  value ? value.split(':')[1] : new Date().getMinutes()

        return padMinute(minute)
    }),
    // Keeping manipulations simple, no crazy stuff like adding hour if minute > 59...
    withHandlers({
        onHourChange: props => event => {
            event.target.select()

            let hour = Number(event.target.value)

            if (hour > 23 || hour < 0) {
                hour = 0
            }

            props.setHour(hour)
        },
        onMinuteChange: props => event => {
            event.target.select()

            let minute = Number(event.target.value)

            if (minute > 59 || minute < 0) {
                minute = 0
            }

            props.setMinute(padMinute(minute))
        },
        onKeyDown: props => event => {
            if (event.keyCode === 13) {
                event.preventDefault()
                props.onChange(format(props))
            }
        },
        onSetClick: props => event => {
            event.preventDefault()
            props.onChange(format(props))
        },
        onFocus: props => event => {
            event.target.select()
        }
    }),
    CSSModules(styles),
)(TimePicker)
