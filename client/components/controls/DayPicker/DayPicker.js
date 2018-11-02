import React, { Component, createRef } from 'react'
import PropTypes from 'prop-types'
import Overlay from 'react-overlays/lib/Overlay'
import { DayPicker as Base } from 'components/pickers'
import Callout from 'components/callout'
import styles from './DayPicker.css'
import Holder from '../Holder'

export default class DayPicker extends Component {
    static propTypes = {
        date: PropTypes.instanceOf(Date),
        onChange: PropTypes.func.isRequired,
        disabledDays: PropTypes.func,
        children: PropTypes.node,
        container: PropTypes.node,
    }
    static defaultProps = {
        date: new Date(),
        onChange() {},
        disabledDays: {
            after: new Date(),
        },
    }
    state = {
        isCalendarVisible: false,
    }
    target = createRef()
    set isCalendarVisible(isCalendarVisible) {
        this.setState({ isCalendarVisible })
    }
    hideCalendar = () => {
        this.isCalendarVisible = false
    }
    showCalendar = () => {
        this.isCalendarVisible = true
    }
    handleDayClick = (day, { disabled }) => {
        if (disabled) {
            return
        }

        this.isCalendarVisible = false
        this.props.onChange(day)
    }
    render() {
        const {
            date,
            disabledDays,
            children,
            container = this,
            onChange,
            ...props
        } = this.props
        const { isCalendarVisible } = this.state
        const className = isCalendarVisible ? 'Input--Open' : 'Input'
        const handleClick = isCalendarVisible ? null : this.showCalendar

        return (
            <div
                ref={this.target}
                className={styles.Container}
                onClick={handleClick}>
                <div className={styles[className]} tabIndex={0}>
                    <Holder value={children} />
                </div>
                <Overlay
                    show={isCalendarVisible}
                    onHide={this.hideCalendar}
                    onEscapeKeyUp={this.hideCalendar}
                    placement="bottom"
                    rootClose
                    shouldUpdatePosition
                    target={this.target.current}
                    container={container}>
                    <Callout>
                        <Base
                            initialMonth={date || undefined}
                            selectedDays={date}
                            disabledDays={disabledDays}
                            onDayClick={this.handleDayClick}
                            {...props}
                        />
                    </Callout>
                </Overlay>
            </div>
        )
    }
}
