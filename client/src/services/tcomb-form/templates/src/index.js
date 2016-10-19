import React from 'react'
import {DayPicker, DateUtils} from 'components/misc'
import {TimePicker} from 'components/controls'
import styles from './Picker.css'
import moment from 'moment'

import checkbox from './checkbox'
import picker from './picker'
import list from './list'
import file from './file'
import radio from './radio'
import select from './select'
import struct from './struct'
import textbox from './textbox'

export default {
  checkbox,
  list,
  radio,
  select,
  struct,
  textbox,
  file,
}

const TODAY = new Date()
function defaultDisabledDays(day) {
    return moment(day).isAfter(TODAY, 'day')
}

export const pickers = {
    date: picker.clone({
        getFormat(locals) {
            return value => value ? value.toISOString().substring(0, 10) : ''
        },
        renderButton() {
            return null
        },
        renderContent(locals) {
            const {
                value,
                renderDay,
                locale,
                localeUtils,
                onSelect,
                disabledDays = defaultDisabledDays,
            } = locals
            const props = {
                initialMonth: value || undefined,
                modifiers: {
                    selected: date => DateUtils.isSameDay(value, date)
                },
                onDayClick: onSelect,
                disabledDays,
                value,
                localeUtils,
                locale,
                renderDay
            }

            return <DayPicker {...props} />
        }
    }),
    time: picker.clone({
        renderContent(locals) {
            const {value, onChange, close} = locals
            function handleKeyDown(event) {
                if (event.keyCode === 13) {
                    onChange(value)
                    close()
                }
            }

            return <TimePicker value={value} onChange={onChange} onKeyDown={handleKeyDown} autoFocus />
        }
    }),
    datetime: picker.clone({
        getFormat(locals) {
            return value => value ? moment(value).format('YYYY-MM-DD HH:mm') : ''
        },
        renderContent(locals) {
            const value = locals.value || new Date()
            const time = `${value.getHours()}:${value.getMinutes()}`
            const {
                renderDay,
                locale,
                localeUtils,
                onChange,
                close,
                disabledDays = defaultDisabledDays,
            } = locals
            function onDayClick(event, day) {
                day.setHours(value.getHours())
                day.setMinutes(value.getMinutes())

                onChange(day)
            }
            const props = {
                initialMonth: value || undefined,
                modifiers: {
                    selected: date => DateUtils.isSameDay(value, date)
                },
                onDayClick,
                disabledDays,
                value,
                localeUtils,
                locale,
                renderDay
            }
            function handleTimeChange(time) {
                const [hours, minutes] = time.split(':').map(Number)

                value.setHours(hours)
                value.setMinutes(minutes)

                onChange(new Date(value.getTime()))
            }

            return (
                <div className={styles.DateTime}>
                    <DayPicker {...props} />
                    <TimePicker value={time} onChange={handleTimeChange} />
                </div>
            )
        }
    })
}
