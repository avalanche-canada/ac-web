import React from 'react'
import t from 'tcomb-form/lib'
import en from 'tcomb-form/lib/i18n/en'
import templates from 'tcomb-form-templates-semantic'
import struct from './templates/struct'
import radio from './templates/radio'
import DatePicker from './templates/DatePicker'
import {GeoPosition as GeoPositionControl} from 'components/controls'

// Date
function renderDate(locals) {
    return (
        <DatePicker {...locals} />
    )
}

const dateTemplate = templates.date.clone({renderDate})

class DatePickerFactory extends t.form.Textbox {
    getTemplate() {
        return dateTemplate
    }
}

t.Date.getTcombFormFactory = () => DatePickerFactory


// GeoPosition
export const GeoPosition = t.struct({
    longitude: t.Number,
    latitude: t.Number,
})

function handleGeoPositionChange(onChange) {
    return ({longitude, latitude}) => {
        onChange('longitude', longitude)
        onChange('latitude', latitude)
    }
}

class GeoPositionFactory extends t.form.Struct {
    getTemplate() {
        return struct.clone({
            renderFieldset(children, locals) {
                const onChange = handleGeoPositionChange(locals.onChange)

                return struct.renderFieldset([...children, (
                    <GeoPositionControl onChange={onChange} />
                )], locals)
            }
        })
    }
}

GeoPosition.getTcombFormFactory = () => GeoPositionFactory



Object.assign(t.form.Form, {
    templates: {
        ...templates,
        struct,
        radio,
        date: dateTemplate,
    },
    i18n: en,
})

export default t
