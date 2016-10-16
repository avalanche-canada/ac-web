import React from 'react'
import {DayPicker, DateUtils} from 'components/misc'
import {TimePicker} from 'components/misc'
import picker from './picker'

export default picker.clone({
    getFormat(locals) {
        return value => value ? value.toISOString().substring(0, 16).replace('T', ' ') : ''
    },
    renderPicker(locals) {
        const {
            value = new Date(),
            renderDay,
            locale,
            localeUtils,
            onSelect,
            onChange,
            close
        } = locals
        const props = {
            initialMonth: value || undefined,
            modifiers: {
                selected: date => DateUtils.isSameDay(value, date)
            },
            onDayClick: onSelect,
            value,
            localeUtils,
            locale,
            renderDay
        }
        function handleDayClick(day) {
            day.setHours(value.getHours())
            day.setMinutes(value.getMinutes())

            onChange(day)
        }
        function handleTimeChange(time) {
            const [hours, minutes] = time.split(':').map(Number)

            value.setHours(hours)
            value.setMinutes(minutes)

            onChange(value)

            close()
        }

        return (
            <div>
                <DayPicker {...props} />
                <TimePicker value={value} onChange={handleTimeChange} />
            </div>
        )
    },
})
