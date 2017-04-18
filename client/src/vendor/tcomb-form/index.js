import React from 'react'
import t from 'tcomb-form/lib'
import en from 'tcomb-form/lib/i18n/en'
import templates, {pickers} from './templates/src'
import Picker from './Picker'
import {GeoPosition as GeoPositionControl} from '~/components/controls'
import {isTypeSupported} from '~/utils/input'
import parse from 'date-fns/parse'

// Date
class DateFactory extends t.form.Textbox {
    static transformer = {
        format(value) {
            return value instanceof Date ? value.toISOString() : value
        },
        parse(value) {
            return value ? parse(value) : null
        }
    }
    getTransformer() {
        return DateFactory.transformer
    }
}
class DatePickerFactory extends t.form.Textbox {
    getTemplate() {
        return templates.textbox.clone({
            renderTextbox(locals) {
                return <Picker template={pickers.date} {...locals} />
            }
        })
    }
}
Object.assign(t.Date, {
    getTcombFormFactory() {
        if (isTypeSupported('date')) {
            return DateFactory
        }

        return DatePickerFactory
    }
})

// Time
// TODO: Remove after looking that it is not used anymore
export const Time = t.irreducible('Time', value => typeof value === 'string')

class TimePickerFactory extends t.form.Textbox {
    getTemplate() {
        return templates.textbox.clone({
            renderTextbox(locals) {
                return <Picker template={pickers.time} {...locals} />
            }
        })
    }
}
Object.assign(Time, {
    getTcombFormFactory() {
        if (isTypeSupported('time')) {
            return t.form.Textbox
        }

        return TimePickerFactory
    }
})

// Date and Time
export const DateTime = t.irreducible('DateTime', value => value instanceof Date)

class DateTimePickerFactory extends t.form.Textbox {
    getTemplate() {
        return templates.textbox.clone({
            renderTextbox(locals) {
                return <Picker template={pickers.datetime} {...locals} />
            }
        })
    }
}
Object.assign(DateTime, {
    getTcombFormFactory() {
        if (isTypeSupported('datetime-local')) {
            return DateFactory
        }

        return DateTimePickerFactory
    }
})

// FileList
export const FileList = t.irreducible('FileList',
    files => files instanceof window.FileList || Array.isArray(files)
)

class FileListFactory extends t.form.Textbox {
    getTemplate() {
        return templates.file
    }
}

FileList.getTcombFormFactory = () => FileListFactory

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

export const BooleanStruct = t.dict(t.String, t.Boolean, 'BooleanStruct')

export function createBooleanStruct(values) {
    const struct = t.struct(values.reduce((struct, value) => {
        struct[value] = t.Boolean

        return struct
    }, {}))

    return Object.assign(struct, {
        getTcombFormFactory() {
            return CheckboxSet
        }
    })
}

class CheckboxSet extends t.form.Struct {
    isValueNully() {
        return Object.keys(this.refs).every(ref => {
            const value = this.refs[ref].getValue()

            return t.Nil.is(value) || value !== true
        })
    }
}

Object.assign(t.form.Form, {
    templates,
    i18n: en,
})

export default t
