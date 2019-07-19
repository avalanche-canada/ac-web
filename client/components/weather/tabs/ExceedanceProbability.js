import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Container, Set, Item } from 'components/pill'
import { DropdownFromOptions, DayPicker } from 'components/controls'
import styles from './ExceedanceProbability.css'
import differenceInHours from 'date-fns/difference_in_hours'
import startOfDay from 'date-fns/start_of_day'
import addDays from 'date-fns/add_days'
import isWithinRange from 'date-fns/is_within_range'
import {
    MAXIMUM_TEMPERATURE,
    MINIMUM_TEMPERATURE,
    PRECIPITATION,
    ACCUMULATED_PRECIPITATION,
    PRODUCTS,
    PARAMETERS,
    format,
} from 'services/msc/naefs'
import Shim from 'components/Shim'

Image.propTypes = {
    date: PropTypes.instanceOf(Date).isRequired,
    product: PropTypes.oneOf(Array.from(PRODUCTS)).isRequired,
    param: PropTypes.string.isRequired,
    from: PropTypes.instanceOf(Date).isRequired,
    to: PropTypes.instanceOf(Date).isRequired,
}

function Image({ date, product, from, to, param }) {
    date = startOfDay(date)
    from = startOfDay(from)
    to = startOfDay(to)

    const src = format({
        product,
        param,
        date,
        start: differenceInHours(from, date),
        end: differenceInHours(to, date),
    })

    return <img src={src} />
}

function Title({ product, children }) {
    let prefix = null
    let suffix = null

    switch (product) {
        case TEMPERATURE:
            prefix = 'Probability of temperature'
            suffix = 'at least one day'
            break
        case PRECIPITATION:
            prefix = 'Probability of precipitation'
            suffix = 'at least one day'
            break
        case ACCUMULATED_PRECIPITATION:
            prefix = 'Probability of precipitation accumulation'
            suffix = 'for the whole period'
            break
        default:
            throw new Error(`product = ${product} not recognized.`)
    }

    return (
        <h4 className={styles.Title} style={{ marginBottom: 0 }}>
            {prefix}
            {children}
            {suffix}
        </h4>
    )
}

ExceedanceProbability.propTypes = {
    date: PropTypes.instanceOf(Date).isRequired,
}

export default function ExceedanceProbability({ date }) {
    const [state, setState] = useState({
        product: TEMPERATURE,
        param: DEFAULT_PARAMETERS.get(TEMPERATURE),
        from: addDays(date, 4),
        to: addDays(date, 7),
    })
    const { product, param, from, to } = state
    const activeIndex = Array.from(TITLES.keys()).indexOf(product)
    function fromDisabledDays(day) {
        return !isWithinRange(day, date, addDays(date, 5))
    }
    function toDisabledDays(day) {
        return !isWithinRange(day, addDays(date, 5), addDays(date, 9))
    }
    const realProduct = getRealProduct(product, param)
    function handleFromChange(from) {
        setState(state => ({ ...state, from }))
    }
    function handleToChange(to) {
        setState(state => ({ ...state, to }))
    }
    function handleParamChange(param) {
        if (!param) {
            return
        }

        setState(state => ({ ...state, param }))
    }
    function handleActivateType(index) {
        // Use "TITLES" because index reflects which tab clicked
        const [product] = Array.from(TITLES)[index]

        setState(state => ({
            ...state,
            product,
            param: DEFAULT_PARAMETERS.get(product),
        }))
    }

    return (
        <section>
            <Container>
                <Set onActivate={handleActivateType} activeIndex={activeIndex}>
                    {Array.from(TITLES, ([product, title]) => (
                        <Item key={product}>{title}</Item>
                    ))}
                </Set>
            </Container>
            <Shim right bottom left>
                <Title product={product}>
                    <DropdownFromOptions
                        value={param}
                        options={OPTIONS.get(product)}
                        onChange={handleParamChange}
                    />
                    <div>between</div>
                    <DayPicker
                        date={from}
                        onChange={handleFromChange}
                        disabledDays={fromDisabledDays}
                    />
                    <div>and</div>
                    <DayPicker
                        date={to}
                        onChange={handleToChange}
                        disabledDays={toDisabledDays}
                    />
                </Title>
                <Image {...state} product={realProduct} date={date} />
            </Shim>
        </section>
    )
}

// Utils
function getRealProduct(product, param) {
    if (product !== TEMPERATURE) {
        return product
    }

    if (PARAMETERS.get(MINIMUM_TEMPERATURE).has(param)) {
        return MINIMUM_TEMPERATURE
    } else {
        return MAXIMUM_TEMPERATURE
    }
}

// Constants
const TEMPERATURE = 'TEMPERATURE'
const OPTIONS = new Map([
    [
        TEMPERATURE,
        new Map([
            ['GT0', 'over 0°C'],
            ['LT0', 'under 0°C'],
            ['LT-5', 'under -5°C'],
            ['LT-15', 'under -15°C'],
            ['LT-30', 'under -30°C'],
        ]),
    ],
    [
        PRECIPITATION,
        new Map([
            ['GT0.002', 'more than 2mm'],
            ['GT0.005', 'more than 5mm'],
            ['GT0.010', 'more than 10mm'],
            ['GT0.025', 'more than 25mm'],
        ]),
    ],
    [
        ACCUMULATED_PRECIPITATION,
        new Map([
            ['GT0.002', 'more than 2mm'],
            ['GT0.005', 'more than 5mm'],
            ['GT0.010', 'more than 10mm'],
            ['GT0.025', 'more than 25mm'],
            ['GT0.050', 'more than 50mm'],
        ]),
    ],
])
const DEFAULT_PARAMETERS = new Map([
    [TEMPERATURE, 'LT-5'],
    [PRECIPITATION, 'GT0.025'],
    [ACCUMULATED_PRECIPITATION, 'GT0.025'],
])
const TITLES = new Map([
    [TEMPERATURE, 'Temperature'],
    [PRECIPITATION, 'Precipitation'],
    [ACCUMULATED_PRECIPITATION, 'Accumulated precipitation'],
])
