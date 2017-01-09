import React, {PropTypes, Component} from 'react'
import {findDOMNode} from 'react-dom'
import moment from 'moment'
import CSSModules from 'react-css-modules'
import {DateUtils, DayPicker as Base} from 'components/misc'
import Callout, {BOTTOM} from 'components/callout'
import Overlay from 'react-overlays/lib/Overlay'
import styles from './DayPicker.css'
import Holder from '../Holder'

const today = new Date()
const {isSameDay} = DateUtils
function noop() {}

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
        disabledDays: day => moment(day).isAfter(today, 'day'),
    }
    state = {
        showCalendar: false,
    }
    set showCalendar(showCalendar) {
        this.setState({showCalendar})
    }
    get showCalendar() {
        return this.state.showCalendar
    }
    toggleCalendar = event => {
        this.showCalendar = !this.showCalendar
    }
    hideCalendar = () => {
        this.showCalendar = false
    }
    handleDayClick = (event, date, modifiers) => {
        if (modifiers.disabled) {
            return
        }

        this.showCalendar = false
        this.props.onChange(date)
    }
    get target() {
        return () => findDOMNode(this.refs.target)
    }
    render() {
        const {date, disabledDays, children, container = this} = this.props
        const {showCalendar, hideCalendar} = this
        const styleName = showCalendar ? 'Input--Open' : 'Input'

        return (
            <div ref='target' styleName='Container' onClick={this.toggleCalendar}>
                <div styleName={styleName} tabIndex={0} >
                    <Holder value={children} />
                </div>
                <Overlay
                    show={showCalendar}
                    onHide={hideCalendar}
                    onEscapeKeyUp={hideCalendar}
                    placement='bottom'
                    rootClose
                    shouldUpdatePosition
                    target={this.target}
                    container={container}>
                    <Callout placement={BOTTOM}>
                        <Base
                            initialMonth={date || undefined}
                            selectedDays={day => isSameDay(day, date)}
                            disabledDays={disabledDays}
                            onDayClick={this.handleDayClick} />
                    </Callout>
                </Overlay>
            </div>
        )
    }
}
