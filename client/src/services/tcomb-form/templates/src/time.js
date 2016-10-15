import React from 'react'
import {DayPicker, DateUtils} from 'components/misc'
import picker from './picker'

export default picker.clone({
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
