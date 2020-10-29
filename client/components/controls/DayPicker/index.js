import React, { useMemo, useRef } from 'react'
import PropTypes from 'prop-types'
import format from 'date-fns/format'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import { useIntl } from 'react-intl'
import { Expand } from 'components/button'
import { DATE } from 'utils/date'
import { useBoolean } from 'hooks'
import styles from './DayPicker.css'
import 'react-day-picker/lib/style.css'

DayPicker.propTypes = {
    date: PropTypes.instanceOf(Date),
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string.isRequired,
}

export default function DayPicker({
    date,
    placeholder,
    onChange,
    overlayComponent,
    hideOnDayClick,
    formatDate = date => format(date, DATE),
    keepFocus,
    style,
    ...props
}) {
    const ref = useRef(null)
    const localeUtils = useLocaleUtils()
    const [opened, show, hide] = useBoolean(false)

    return (
        <div className={styles.Container} style={style}>
            <DayPickerInput
                ref={ref}
                value={date}
                showOverlay={opened}
                placeholder={placeholder}
                onDayChange={onChange}
                formatDate={formatDate}
                overlayComponent={overlayComponent}
                hideOnDayClick={hideOnDayClick}
                onDayPickerShow={show}
                onDayPickerHide={hide}
                keepFocus={keepFocus}
                dayPickerProps={{
                    selectedDays: [date],
                    localeUtils,
                    disabledDays: {
                        after: new Date(),
                    },
                    ...props,
                }}
                inputProps={{
                    readOnly: true,
                    className: styles.Input,
                }}
            />
            <Expand
                expanded={opened}
                chevron
                onClick={() => {
                    const { current } = ref

                    opened ? current.hideDayPicker() : current.showDayPicker()
                }}
            />
        </div>
    )
}

export function useLocaleUtils() {
    const intl = useIntl()

    return useMemo(
        () => ({
            formatDay(date) {
                return intl.formatDate(date, {
                    // TODO Extract these values into constants so we can reuse across website
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                })
            },
            formatMonthTitle(date) {
                return intl.formatDate(date, {
                    month: 'long',
                    year: 'numeric',
                })
            },
            formatWeekdayShort(i) {
                const date = dayAt(i)

                return intl.formatDate(date, {
                    weekday: 'short',
                })
            },
            formatWeekdayLong(i) {
                const date = dayAt(i)

                return intl.formatDate(date, {
                    weekday: 'long',
                })
            },
            getFirstDayOfWeek() {
                return 0
            },
        }),
        []
    )
}

function dayAt(i) {
    const date = new Date()

    date.setDate(date.getDate() - date.getDay() + i)

    return date
}
