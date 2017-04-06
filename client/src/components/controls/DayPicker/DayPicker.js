import React, {PropTypes, Component} from 'react'
import CSSModules from 'react-css-modules'
import {DayPicker as Base} from 'components/misc'
import Callout from 'components/callout'
import Overlay from 'react-overlays/lib/Overlay'
import styles from './DayPicker.css'
import Holder from '../Holder'
import noop from 'lodash/noop'

@CSSModules(styles)
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
        onChange: noop,
        disabledDays: {
            after: new Date()
        },
    }
    state = {
        isCalendarVisible: false,
    }
    set isCalendarVisible(isCalendarVisible) {
        this.setState({isCalendarVisible})
    }
    hideCalendar = () => {
        this.isCalendarVisible = false
    }
    showCalendar = () => {
        this.isCalendarVisible = true
    }
    handleDayClick = (day, modifiers, event) => {
        if (modifiers.disabled) {
            return
        }

        this.isCalendarVisible = false
        this.props.onChange(day)
    }
    render() {
        const {date, disabledDays, children, container = this} = this.props
        const {isCalendarVisible} = this.state
        const styleName = isCalendarVisible ? 'Input--Open' : 'Input'
        const handleClick = isCalendarVisible ? noop : this.showCalendar

        return (
            <div ref='target' styleName='Container' onClick={handleClick}>
                <div styleName={styleName} tabIndex={0} >
                    <Holder value={children} />
                </div>
                <Overlay
                    show={isCalendarVisible}
                    onHide={this.hideCalendar}
                    onEscapeKeyUp={this.hideCalendar}
                    placement='bottom'
                    rootClose
                    shouldUpdatePosition
                    target={this.refs.target}
                    container={container}>
                    <Callout>
                        <Base
                            initialMonth={date || undefined}
                            selectedDays={date}
                            disabledDays={disabledDays}
                            onDayClick={this.handleDayClick} />
                    </Callout>
                </Overlay>
            </div>
        )
    }
}
