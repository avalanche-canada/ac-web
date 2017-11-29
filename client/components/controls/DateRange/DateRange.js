import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Input } from 'components/controls'
import { Calendar, Close } from 'components/icons'
import { DayPicker } from 'components/pickers'
import { addDayToRange } from 'utils/date'
import Callout from 'components/callout'
import Overlay from 'react-overlays/lib/Overlay'
import Button, { INCOGNITO } from 'components/button'
import format from 'date-fns/format'
import styles from './DateRange.css'
import noop from 'lodash/noop'

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
        visible: false,
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
    set visible(visible) {
        this.setState({ visible })
    }
    get visible() {
        return this.state.visible
    }
    toggleCalendar = () => {
        this.visible = !this.visible
    }
    hideCalendar = () => {
        this.visible = false
    }
    handleDayClick = day => {
        const range = addDayToRange(day, this.state)

        this.setRange(range)
    }
    handleClearClick = event => {
        event.stopPropagation()

        this.setRange({
            from: null,
            to: null,
        })
    }
    setRange(range) {
        this.setState(range, () => {
            this.props.onChange(range)
        })
    }
    setTarget = target => (this.target = target)
    render() {
        const { hideCalendar } = this
        const { placeholder, container = this } = this.props
        const { from, to } = this.state
        const showClear = from && to
        const range = showClear
            ? `${format(from, 'YYYY-MM-DD')} to ${format(to, 'YYYY-MM-DD')}`
            : ''

        return (
            <div ref={this.setTarget} className={styles.Container}>
                <Calendar />
                <Input
                    className={styles.Input}
                    placeholder={placeholder}
                    onClick={this.toggleCalendar}
                    value={range}
                />
                {showClear && (
                    <Button
                        className={styles.Clear}
                        icon={<Close />}
                        onClick={this.handleClearClick}
                        kind={INCOGNITO}
                    />
                )}
                <Overlay
                    show={this.visible}
                    onHide={hideCalendar}
                    onEscapeKeyUp={hideCalendar}
                    placement="bottom"
                    rootClose
                    shouldUpdatePosition
                    target={this.target}
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
