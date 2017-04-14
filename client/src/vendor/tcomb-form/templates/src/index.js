import React from 'react'
import {DayPicker, DateUtils} from '~/components/misc'
import {TimePicker} from '~/components/controls'
import styles from './Picker.css'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import isBefore from 'date-fns/is_before'
import isAfter from 'date-fns/is_after'
import isWithinRange from 'date-fns/is_within_range'

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
            } = locals
            const props = {
                initialMonth: value || undefined,
                modifiers: {
                    selected: value,
                },
                onDayClick: onSelect,
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
            return value => value ? format(parse(value), 'YYYY-MM-DDTHH:mm') : ''
        },
        renderContent(locals) {
            const value = locals.value || new Date()
            const time = format(value, 'HH:mm')
            const {
                renderDay,
                locale,
                localeUtils,
                onChange,
                close,
                attrs: {
                    min,
                    max
                }
            } = locals
            function disabledDays(day) {
                if (min && max) {
                    return !isWithinRange(day, min,max)
                }

                if (min) {
                    return isBefore(day, min)
                }

                if (max) {
                    return isAfter(day, max)
                }

                return false
            }
            function onDayClick(day, modifiers, event) {
                day.setHours(value.getHours())
                day.setMinutes(value.getMinutes())

                onChange(day)
            }
            const props = {
                initialMonth: value || undefined,
                modifiers: {
                    selected: value
                },
                onDayClick,
                value,
                localeUtils,
                disabledDays,
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
