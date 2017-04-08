import React from 'react'
import PropTypes from 'prop-types'
import {compose, withState, withHandlers, setPropTypes, defaultProps} from 'recompose'
import CSSModules from 'react-css-modules'
import styles from './TimePicker.css'
import noop from 'lodash/noop'

function padMinute(minute) {
    minute = Number(minute)

    return minute < 10 ? `0${minute}` : String(minute)
}
function format({hour, minute}) {
    return `${hour}:${minute}`
}


function TimePicker({hour, onHourChange, minute, onMinuteChange, onFocus, onKeyDown, step, autoFocus}) {
    return (
        <div styleName='Container'>
            <label title='Hour' styleName='Hour'>
                <input value={hour} name='time-picker-hour' onChange={onHourChange} onKeyDown={onKeyDown} type='number' min='0' max='23' onFocus={onFocus} autoFocus={autoFocus} />
                <span styleName='Label'>Hour</span>
            </label>
            <label title='Minute' styleName='Minute'>
                <input value={minute} name='time-picker-minute' onChange={onMinuteChange} onKeyDown={onKeyDown} type='number' min='0' max='59' step={step} onFocus={onFocus} />
                <span styleName='Label'>Minute</span>
            </label>
        </div>
    )
}

export default compose(
    setPropTypes({
        value: PropTypes.string,
        onChange: PropTypes.func.isRequired,
        onKeyDown: PropTypes.func,
        step: PropTypes.number,
        autoFocus: PropTypes.bool,
    }),
    defaultProps({
        step: 15,
        onChange: noop,
        onKeyDown: noop,
    }),
    withState('hour', 'setHour', ({value = ''}) => {
        return value.split(':')[0] || 0
    }),
    withState('minute', 'setMinute', ({value = ''}) => {
        return padMinute(value.split(':')[1] || 0)
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
            props.onChange(format({
                ...props,
                hour,
            }))
        },
        onMinuteChange: props => event => {
            event.target.select()

            let minute = Number(event.target.value)

            if (minute > 59 || minute < 0) {
                minute = 0
            }

            minute = padMinute(minute)

            props.setMinute(minute)
            props.onChange(format({
                ...props,
                minute,
            }))
        },
        onFocus: props => event => {
            event.target.select()
        }
    }),
    CSSModules(styles),
)(TimePicker)
