import React from 'react'
import {DayPicker, DateUtils} from 'components/misc'
import picker from './picker'

export default picker.clone({
    getFormat(locals) {
        return value => value ? value.toISOString().substring(0, 10) : ''
    },
    renderPicker(locals) {
        const {value, renderDay, locale, localeUtils, onSelect} = locals
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

        return <DayPicker {...props} />
    },
})
