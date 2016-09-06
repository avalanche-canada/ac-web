import React, {PropTypes, Component} from 'react'
import {findDOMNode} from 'react-dom'
import moment from 'moment'
import CSSModules from 'react-css-modules'
import {DateUtils, DayPicker} from 'components/misc'
import {Expand} from 'components/button'
import Callout, {BOTTOM} from 'components/callout'
import {Overlay} from 'react-overlays'
import styles from './Picker.css'

const {isSameDay} = DateUtils
function K() {}
function formatDate(date) {
    return moment(date).format('YYYY-MM-DD')
}

@CSSModules(styles)
export default class Picker extends Component {
    static propTypes = {
        date: PropTypes.instanceOf(Date).isRequired,
        onChange: PropTypes.func.isRequired,
        disabledDays: PropTypes.func,
        children: PropTypes.node,
        container: PropTypes.node,
    }
    static defaultProps = {
        date: new Date(),
        onChange: K,
        disabledDays: day => moment(day).isAfter(new Date(), 'day'),
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
        const {date, disabledDays, children, container} = this.props
        const {showCalendar, toggleCalendar, hideCalendar} = this
        const momentDate = moment(date)

        return (
            <div ref='target' styleName='Day'>
                <div styleName='Content' onClick={toggleCalendar}>
                    {children} <Expand chevron expanded={showCalendar} />
                </div>
                <Overlay
                    show={showCalendar}
                    placement='bottom'
                    shouldUpdatePosition
                    rootClose
                    backdrop
                    onBackdropClick={hideCalendar}
                    onEscapeKeyUp={hideCalendar}
                    target={this.target}>
                    <Callout placement={BOTTOM}>
                        <DayPicker
                            initialMonth={date}
                            selectedDays={day => momentDate.isSame(day, 'day')}
                            disabledDays={disabledDays}
                            onDayClick={this.handleDayClick} />
                    </Callout>
                </Overlay>
            </div>
        )
    }
}
