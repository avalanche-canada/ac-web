import React from 'react'
import PropTypes from 'prop-types'
import { compose, withProps } from 'recompose'
import CSSModules from 'react-css-modules'
import { DropdownFromOptions as Dropdown } from '~/components/controls'
import styles from './Table.css'
import noop from 'lodash/noop'

const NUMBERS = [10, 25, 50, 75, 100, 125, 150, 200]
function toEntry(number) {
    return [number, number]
}

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
    value,
    options,
    onChange = noop,
    prefix = 'Show',
    suffix = 'entries per page.',
}) {
    return (
        <div styleName="PageSizeSelector">
            <div>{prefix}</div>
            <div>
                <Dropdown options={options} value={value} onChange={onChange} />
            </div>
            <div>{suffix}</div>
        </div>
    )
}

export default compose(
    withProps(({ max, numbers, value }) => {
        if (!Array.isArray(numbers)) {
            if (typeof max === 'number') {
                numbers = NUMBERS.filter(number => number < max)
            } else {
                numbers = [10, 25, 50]
            }
        }

        return {
            options: new Map(numbers.map(toEntry)),
            value: value || numbers[0],
        }
    }),
    CSSModules(styles)
)(PageSizeSelector)
