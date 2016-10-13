import React from 'react'
import t from 'tcomb-form'
import DatePicker from './DatePicker'

function renderDate({value, onChange}) {
    return (
        <DatePicker value={value} onChange={onChange} />
    )
}

const dateTemplate = t.form.Form.templates.date.clone({renderDate})

class DatePickerFactory extends t.form.Component {
    getTemplate() {
        return dateTemplate
    }
}

t.Date.getTcombFormFactory = () => DatePickerFactory
