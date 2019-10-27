import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { DropdownFromOptions as Dropdown } from 'components/controls'
import styles from './Table.css'

PageSizeSelector.propTypes = {
    value: PropTypes.number,
    onChange: PropTypes.func.isRequired,
    numbers: PropTypes.arrayOf(PropTypes.number),
    max: PropTypes.number,
    prefix: PropTypes.string,
    suffix: PropTypes.string,
}

function PageSizeSelector({
    value,
    onChange,
    numbers,
    max,
    prefix = 'Show',
    suffix = 'entries per page.',
}) {
    if (!Array.isArray(numbers)) {
        if (typeof max === 'number') {
            numbers = NUMBERS.filter(number => number < max)
        } else {
            numbers = NUMBERS.slice(0, 3)
        }
    }

    return (
        <div className={styles.PageSizeSelector}>
            <div>{prefix}</div>
            <div>
                <Dropdown
                    options={new Map(numbers.map(n => [n, n]))}
                    value={value || numbers[0]}
                    onChange={onChange}
                />
            </div>
            <div>{suffix}</div>
        </div>
    )
}

export default memo(PageSizeSelector)

const NUMBERS = [10, 25, 50, 75, 100, 125, 150, 200]
