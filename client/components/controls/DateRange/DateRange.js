import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import { Input } from '~/components/controls'
import { Calendar, Close } from '~/components/icons'
import { DayPicker } from '~/components/pickers'
import { addDayToRange } from '~/utils/date'
import Callout from '~/components/callout'
import Overlay from 'react-overlays/lib/Overlay'
import Button, { INCOGNITO } from '~/components/button'
import format from 'date-fns/format'
import styles from './DateRange.css'
import noop from 'lodash/noop'

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
        this.setState({ showCalendar })
    }
    get showCalendar() {
        return this.state.showCalendar
    }
    toggleCalendar = () => {
        this.showCalendar = !this.showCalendar
    }
    hideCalendar = () => {
        this.showCalendar = false
    }
    handleDayClick = day => {
        const range = addDayToRange(day, this.state)

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
    componentWillReceiveProps({ from = null, to = null }) {
        this.setState({
            from,
            to,
        })
    }
    render() {
        const { hideCalendar } = this
        const { placeholder, container = this } = this.props
        const { from, to } = this.state
        const showClear = from && to
        const range = showClear
            ? `${format(from, 'YYYY-MM-DD')} to ${format(to, 'YYYY-MM-DD')}`
            : ''

        return (
            <div
                ref="target"
                styleName="Container"
                onClick={this.toggleCalendar}>
                <Calendar />
                <Input
                    styleName="Input"
                    placeholder={placeholder}
                    value={range}
                />
                {showClear &&
                    <Button
                        styleName="Clear"
                        icon={<Close />}
                        onClick={this.handleClearClick}
                        kind={INCOGNITO}
                    />}
                <Overlay
                    show={this.showCalendar}
                    onHide={hideCalendar}
                    onEscapeKeyUp={hideCalendar}
                    placement="bottom"
                    rootClose
                    shouldUpdatePosition
                    target={this.refs.target}
                    container={container}>
                    <Callout>
                        <DayPicker
                            selectedDays={this.state}
                            numberOfMonths={2}
                            onDayClick={this.handleDayClick}
                        />
                    </Callout>
                </Overlay>
            </div>
        )
    }
}
