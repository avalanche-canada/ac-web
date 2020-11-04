import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import * as Icons from 'components/icons'
import { Close } from 'components/button'
import { Control } from 'components/form'
import { GRAY_LIGHT } from 'constants/colors'
import styles from './Search.css'
import { useIntl } from 'react-intl'

Search.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
    placeholder: PropTypes.string,
}

export default function Search({ value, onChange, placeholder = 'Search...' }) {
    const intl = useIntl()
    const input = useRef(null)
    function handleChange({ target }) {
        onChange(target.value)
    }
    function handleReset() {
        const { current } = input

        current.value = ''
        current.focus()

        onChange('')
    }

    placeholder =
        placeholder ||
        intl.formatMessage({
            description: 'Component form/Search',
            defaultMessage: 'Search...',
        })

    return (
        <Control horizontal bordered>
            <i className={styles.Magnify}>
                <Icons.Search color={GRAY_LIGHT} />
            </i>
            <input
                ref={input}
                name="search"
                type="search"
                autoComplete="off"
                className={styles.Input}
                placeholder={placeholder}
                defaultValue={value}
                onChange={handleChange}
            />
            {value && <Close onClick={handleReset} />}
        </Control>
    )
}
