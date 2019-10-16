import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Input } from 'components/controls'
import { Place, Spinner } from 'components/icons'
import noop from 'lodash/noop'
import { place as request } from 'services/mapbox/requests'
import { OptionSet, Option, Dropdown } from 'components/controls/options'
import { Close } from 'components/button'
import { PRIMARY } from 'constants/colors'
import { useCacheAsync, useBoolean, createKey } from 'hooks'
import styles from './Geocoder.css'

Geocoder.propTypes = {
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string,
}

export default function Geocoder({
    value = '',
    onChange = noop,
    placeholder = 'Search',
}) {
    const [active, activate, deactivate] = useBoolean(false)
    const [term, setTerm] = useState(value || '')
    const key = createKey('mapbox', 'places', term)
    const [places, loading] = useCacheAsync(request, [term], undefined, key)
    const showClear = !loading && term
    const opened = term && active && places && Array.isArray(places.features)
    function handleChange(event) {
        const { value } = event.target

        activate()
        setTerm(value)
    }
    function handleOptionClick(place) {
        deactivate()
        setTerm(place.text)
        onChange(place)
    }
    function handleClearClick() {
        deactivate()
        setTerm('')
        onChange(null)
    }

    return (
        <div className={styles.Container}>
            <Place color={PRIMARY} />
            <Input
                type="text"
                placeholder={placeholder}
                className={styles.Input}
                value={term}
                onChange={handleChange}
                onFocus={activate}
                onBlur={deactivate}
            />
            {showClear && <Close onClick={handleClearClick} />}
            {loading && <Spinner />}
            {opened && (
                <Dropdown>
                    <OptionSet onChange={handleOptionClick}>
                        {places.features.map(place => (
                            <Option key={place.id} value={place}>
                                {place.place_name}
                            </Option>
                        ))}
                    </OptionSet>
                </Dropdown>
            )}
        </div>
    )
}
