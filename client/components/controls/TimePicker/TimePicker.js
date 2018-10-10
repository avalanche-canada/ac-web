import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styles from './TimePicker.css'

export default class TimePicker extends PureComponent {
    static propTypes = {
        value: PropTypes.string,
        onChange: PropTypes.func.isRequired,
        onKeyDown: PropTypes.func,
        onFocus: PropTypes.func,
        step: PropTypes.number,
        autoFocus: PropTypes.bool,
    }
    constructor(props) {
        super(props)

        const { value = '' } = props

        this.state = {
            hour: value.split(':')[0] || 0,
            minute: padMinute(value.split(':')[1]),
        }
    }
    handleHourChange = event => {
        let hour = Number(event.target.value)

        if (hour > 23 || hour < 0) {
            hour = 0
        }

        this.setState({ hour }, this.sendChange)
    }
    handleMinuteChange = event => {
        let minute = Number(event.target.value)

        if (minute > 59 || minute < 0) {
            minute = 0
        }

        minute = padMinute(minute)

        this.setState({ minute }, this.sendChange)
    }
    sendChange = () => {
        const { hour, minute } = this.state

        this.props.onChange(`${hour}:${minute}`)
    }
    render() {
        const { step, onKeyDown, autoFocus, onFocus } = this.props
        const { hour, minute } = this.state

        return (
            <div className={styles.Container}>
                <label title="Hour" className={styles.Hour}>
                    <input
                        value={hour}
                        name="time-picker-hour"
                        onChange={this.handleHourChange}
                        onKeyDown={onKeyDown}
                        type="number"
                        min="0"
                        max="23"
                        onFocus={onFocus}
                        autoFocus={autoFocus}
                    />
                    <span className={styles.Label}>Hour</span>
                </label>
                <label title="Minute" className={styles.Minute}>
                    <input
                        value={minute}
                        name="time-picker-minute"
                        onChange={this.handleMinuteChange}
                        onKeyDown={onKeyDown}
                        type="number"
                        min="0"
                        max="59"
                        step={step}
                        onFocus={onFocus}
                    />
                    <span className={styles.Label}>Minute</span>
                </label>
            </div>
        )
    }
}

// Utils
function padMinute(minute = 0) {
    return String(minute).padStart(2, '0')
}
