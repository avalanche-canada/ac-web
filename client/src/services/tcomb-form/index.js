import React from 'react'
import t from 'tcomb-form/lib'
import en from 'tcomb-form/lib/i18n/en'
import templates from './templates/src'
import Picker from './Picker'
import {GeoPosition as GeoPositionControl} from 'components/controls'

// FileList
export const FileList = t.irreducible('FileList', value => value instanceof window.FileList)
class FileListFactory extends t.form.Textbox {
    getTemplate() {
        return templates.file
    }
}
FileList.getTcombFormFactory = () => FileListFactory


// Date
class DatePickerFactory extends t.form.Textbox {
    getTemplate() {
        return templates.textbox.clone({
            renderTextbox(locals) {
                return <Picker template={templates.date} {...locals} />
            }
        })
    }
}

t.Date.getTcombFormFactory = () => DatePickerFactory


// Time
export const Time = t.irreducible('Time', value => typeof value === 'string')

class TimePickerFactory extends t.form.Textbox {
    getTemplate() {
        return templates.textbox.clone({
            renderTextbox(locals) {
                return <Picker template={templates.time} {...locals} />
            }
        })
    }
}

Time.getTcombFormFactory = () => TimePickerFactory


// Date and Time
export const DateTime = t.irreducible('DateTime', value => value instanceof Date)

DateTime.getTcombFormFactory = () => DatePickerFactory


// GeoPosition
function range(min, max) {
    return t.refinement(t.Number, rate => rate >= min && rate <= max)
}
export const GeoPosition = t.struct({
    longitude: range(-180, 180),
    latitude: range(-90, 90),
})

function handleGeoPositionChange(onChange) {
    return ({longitude, latitude}) => {
        setTimeout(() => onChange('longitude', longitude))
        setTimeout(() => onChange('latitude', latitude))
    }
}

function toNumber(number) {
    number = Number(number)

    return isNaN(number) ? null : number
}

class GeoPositionFactory extends t.form.Struct {
    getTemplate() {
        return templates.struct.clone({
            renderFieldset(children, locals) {
                const onChange = handleGeoPositionChange(locals.onChange)
                const {longitude, latitude} = locals.value

                return templates.struct.renderFieldset([...children, (
                    <GeoPositionControl
                        onChange={onChange}
                        longitude={toNumber(longitude)}
                        latitude={toNumber(latitude)} />
                )], locals)
            }
        })
    }
}

GeoPosition.getTcombFormFactory = () => GeoPositionFactory

Object.assign(t.form.Form, {
    templates,
    i18n: en,
})

export default t
