import React, {PropTypes, Component} from 'react'
import {findDOMNode} from 'react-dom'
import CSSModules from 'react-css-modules'
import {compose, withHandlers} from 'recompose'
import {DropdownFromOptions, Input} from 'components/controls'
import {Calendar, Close, Home} from 'components/icons'
import {DayPicker, DateUtils} from 'components/misc'
import Callout, {BOTTOM} from 'components/callout'
import Overlay from 'react-overlays/lib/Overlay'
import {OptionSet, Option} from 'components/controls/options'
import Button, {INCOGNITO} from 'components/button'
import {formatAsDay, parseFromDay} from 'utils/date'
import styles from './DateRange.css'

function noop() {}

@CSSModules(styles)
export default class DateRange extends Component {
    static propTypes = {
        from: PropTypes.instanceOf(Date),
        to: PropTypes.instanceOf(Date),
        onChange: PropTypes.func.isRequired,
        placeholder: PropTypes.string,
        container: PropTypes.node,
    }
    static defaultProps = {
        onChange: noop,
        placeholder: 'Date Range',
    }
    state = {
        showCalendar: false,
        from: null,
        to: null,
    }
    constructor(props) {
        super(props)

        Object.assign(this.state, {
            from: props.from,
            to: props.to,
        })
    }
    set showCalendar(showCalendar) {
        this.setState({showCalendar})
    }
    get showCalendar() {
        return this.state.showCalendar
    }
    get target() {
        return findDOMNode(this.refs.target)
    }
    toggleCalendar = () => {
        this.showCalendar = !this.showCalendar
    }
    hideCalendar = () => {
        this.showCalendar = false
    }
    selectedDays = day => {
        return DateUtils.isDayInRange(day, this.state)
    }
    handleDayClick = (event, day) => {
        const range= DateUtils.addDayToRange(day, this.state)

        this.onChange(range)
    }
    handleClearClick = event => {
        event.stopPropagation()
        this.onChange({
            from: null,
            to: null,
        })
    }
    onChange(range) {
        this.setState(range, () => {
            this.props.onChange(range)
        })
    }
    componentWillReceiveProps({from = null, to = null}) {
        this.setState({
            from,
            to,
        })
    }
    render() {
        const {hideCalendar} = this
        const {placeholder, container = this} = this.props
        const {from, to} = this.state
        const showClear = from && to
        const range = showClear ? `${formatAsDay(from)} to ${formatAsDay(to)}` : ''

        return (
            <div ref='target' styleName='Container' onClick={this.toggleCalendar}>
                <Calendar />
                <Input styleName='Input' placeholder={placeholder} value={range} />
                {showClear && <Button styleName='Clear' icon={<Close />} onClick={this.handleClearClick} kind={INCOGNITO} />}
                <Overlay
                    show={this.showCalendar}
                    onHide={hideCalendar}
                    onEscapeKeyUp={hideCalendar}
                    placement='bottom'
                    rootClose
                    shouldUpdatePosition
                    target={this.target}
                    container={container} >
                    <Callout placement='Bottom'>
                        <DayPicker selectedDays={this.selectedDays} numberOfMonths={2} onDayClick={this.handleDayClick} />
                    </Callout>
                </Overlay>
            </div>
        )
    }
}
