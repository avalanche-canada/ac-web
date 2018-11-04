import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { DropdownFromOptions as Dropdown } from 'components/controls'
import styles from './Table.css'

PageSizeSelector.propTypes = {
    value: PropTypes.number,
    max: PropTypes.number,
    numbers: PropTypes.arrayOf(PropTypes.number),
    onChange: PropTypes.func.isRequired,
    prefix: PropTypes.string,
    suffix: PropTypes.string,
    options: PropTypes.object,
}

function PageSizeSelector({
    max,
    value,
    prefix = 'Show',
    suffix = 'entries per page.',
    onChange,
    numbers,
}) {
    if (!Array.isArray(numbers)) {
        if (typeof max === 'number') {
            numbers = NUMBERS.filter(number => number < max)
        } else {
            numbers = [10, 25, 50]
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
