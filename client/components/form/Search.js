import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import * as Icons from 'components/icons'
import { Close } from 'components/button'
import { Control } from 'components/form'
import { GRAY_LIGHT } from 'constants/colors'

Search.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
    placeholder: PropTypes.string,
}

export default function Search({ value, onChange, placeholder = 'Search...' }) {
    const input = useRef(null)
    function focus() {
        input.current.focus()
    }
    function handleChange(event) {
        const { value } = event.target

        onChange(value)
    }
    function handleReset() {
        onChange('')
        focus()
    }

    return (
        <Control horizontal bordered>
            <i style={SEARCH_ICON_STYLE} onClick={focus}>
                <Icons.Search color={GRAY_LIGHT} />
            </i>
            <input
                ref={input}
                name="search"
                type="search"
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
            />
            {value && <Close onClick={handleReset} />}
        </Control>
    )
}

// Constants
const SEARCH_ICON_STYLE = {
    marginLeft: 10,
}
