import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import format from 'date-fns/format'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import { Expand } from 'components/button'
import { DATE } from 'utils/date'
import styles from './DayPicker.css'
import 'react-day-picker/lib/style.css'
import { useBoolean } from 'utils/react/hooks'

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
                type="button"
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
