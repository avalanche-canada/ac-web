import React from 'react'
import { TimePicker, DayPicker } from 'components/controls'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import isBefore from 'date-fns/is_before'
import isAfter from 'date-fns/is_after'
import isSameDay from 'date-fns/is_same_day'
import isWithinRange from 'date-fns/is_within_range'

import checkbox from './checkbox'
import picker from './picker'
import list from './list'
import file from './file'
import radio from './radio'
import select from './select'
import struct from './struct'
import textbox from './textbox'
import { DATETIME } from 'utils/date'
import { GRAY_LIGHTER } from 'constants/colors'

export default {
    checkbox,
    list,
    radio,
    select,
    struct,
    textbox,
    file,
}

export const pickers = {
    date: picker.clone({
        getFormat() {
            return value => (value ? value.toISOString().substring(0, 10) : '')
        },
        renderContent(locals) {
            const {
                value,
                onChange,
                attrs: { min, max },
            } = locals

            return (
                <DayPicker
                    onChange={onChange}
                    date={value}
                    disabledDays={disabledDaysFactory(min, max)}
                />
            )
        },
    }),
    datetime: picker.clone({
        getFormat() {
            return value =>
                value ? format(parse(value), 'YYYY-MM-DDTHH:mm') : ''
        },
        renderContent(locals) {
            const value = locals.value || new Date()
            const {
                onChange,
                attrs: { min, max },
            } = locals

            function handleChange(date) {
                date.setHours(value.getHours())
                date.setMinutes(value.getMinutes())

                onChange(date)
            }

            return (
                <DayPicker
                    date={value}
                    placeholder="Select a date/time"
                    hideOnDayClick={false}
                    onChange={handleChange}
                    keepFocus={false}
                    disabledDays={disabledDaysFactory(min, max)}
                    formatDate={formatDate}
                    overlayComponent={OverlayComponent}
                    style={STYLE}
                />
            )
        },
    }),
}

// Utils
function formatDate(date) {
    return format(date, DATETIME)
}
function OverlayComponent({
    classNames,
    children,
    selectedDay,
    input,
    month,
    ...props
}) {
    const [date] = selectedDay
    const time = format(date, 'HH:mm')

    function handleTimeChange(time) {
        const [hours, minutes] = time.split(':').map(Number)

        date.setHours(hours)
        date.setMinutes(minutes)

        children.props.onDayClick(new Date(date.getTime()), {})
    }

    return (
        <div className={classNames.overlayWrapper} {...props}>
            <div className={classNames.overlay}>
                {children}
                <TimePicker value={time} onChange={handleTimeChange} />
            </div>
        </div>
    )
}
function disabledDaysFactory(min, max) {
    return function disabledDays(day) {
        if (min && max) {
            return !isWithinRange(day, min, max)
        }

        if (min) {
            return isBefore(day, min) && !isSameDay(day, min)
        }

        if (max) {
            return isAfter(day, max) && !isSameDay(day, max)
        }

        return false
    }
}
const STYLE = {
    border: '1px solid ' + GRAY_LIGHTER,
}
