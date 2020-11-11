import React, { useMemo, useState } from 'react'
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
import { FormattedList, FormattedMessage, useIntl } from 'react-intl'

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
    const intl = useIntl()
    const description = 'Component weather/ExceedanceProbability'
    const values = {
        children() {
            return children
        },
    }
    let selector = null

    switch (product) {
        case TEMPERATURE:
            selector = intl.formatMessage(
                {
                    description,
                    defaultMessage:
                        'Probability of temperature <children></children> at least one day',
                },
                values
            )
            break
        case PRECIPITATION:
            selector = intl.formatMessage(
                {
                    description,
                    defaultMessage:
                        'Probability of precipitation <children></children> at least one day',
                },
                values
            )
            break
        case ACCUMULATED_PRECIPITATION:
            selector = intl.formatMessage(
                {
                    description,
                    defaultMessage:
                        'Probability of precipitation accumulation <children></children> for the whole period',
                },
                values
            )
            break
        default:
            throw new Error('product = {product} not recognized.')
    }

    return (
        <h4 className={styles.Title} style={{ marginBottom: 0 }}>
            {selector}
        </h4>
    )
}

ExceedanceProbability.propTypes = {
    date: PropTypes.instanceOf(Date).isRequired,
}

export default function ExceedanceProbability({ date }) {
    const options = useOptions()
    const titles = useTitles()
    const [state, setState] = useState({
        product: TEMPERATURE,
        param: DEFAULT_PARAMETERS.get(TEMPERATURE),
        from: addDays(date, 4),
        to: addDays(date, 7),
    })
    const { product, param, from, to } = state
    const activeIndex = Array.from(titles.keys()).indexOf(product)
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
        // Use "titles" because index reflects which tab clicked
        const [product] = Array.from(titles)[index]

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
                    {Array.from(titles, ([product, title]) => (
                        <Item key={product}>{title}</Item>
                    ))}
                </Set>
            </Container>
            <Shim right bottom left>
                <Title product={product}>
                    <FormattedMessage
                        description="Component weather/ExceedanceProbability"
                        defaultMessage="<prefix></prefix> between <sufix></sufix>"
                        values={{
                            prefix() {
                                return (
                                    <DropdownFromOptions
                                        value={param}
                                        options={options.get(product)}
                                        onChange={handleParamChange}
                                    />
                                )
                            },
                            sufix() {
                                return (
                                    <FormattedList
                                        type="conjunction"
                                        value={[
                                            <DayPicker
                                                date={from}
                                                onChange={handleFromChange}
                                                disabledDays={fromDisabledDays}
                                            />,
                                            <DayPicker
                                                date={to}
                                                onChange={handleToChange}
                                                disabledDays={toDisabledDays}
                                            />,
                                        ]}
                                    />
                                )
                            },
                        }}
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
function useOptions() {
    const intl = useIntl()
    const description = 'Component weather/ExceedanceProbability'
    function under(temperature) {
        return intl.formatMessage(
            {
                description,
                defaultMessage: 'under {temperature, number}°C',
            },
            { temperature }
        )
    }
    function over(temperature) {
        return intl.formatMessage(
            {
                description,
                defaultMessage: 'over {temperature, number}°C',
            },
            { temperature }
        )
    }
    function moreThan(value) {
        return intl.formatMessage(
            {
                description,
                defaultMessage: 'more than {value, number}mm',
            },
            { value }
        )
    }

    return useMemo(
        () =>
            new Map([
                [
                    TEMPERATURE,
                    new Map([
                        ['GT0', over(0)],
                        ['LT0', under(0)],
                        ['LT-5', under(-5)],
                        ['LT-15', under(-15)],
                        ['LT-30', under(-30)],
                    ]),
                ],
                [
                    PRECIPITATION,
                    new Map([
                        ['GT0.002', moreThan(2)],
                        ['GT0.005', moreThan(5)],
                        ['GT0.010', moreThan(10)],
                        ['GT0.025', moreThan(25)],
                    ]),
                ],
                [
                    ACCUMULATED_PRECIPITATION,
                    new Map([
                        ['GT0.002', moreThan(2)],
                        ['GT0.005', moreThan(5)],
                        ['GT0.010', moreThan(10)],
                        ['GT0.025', moreThan(25)],
                        ['GT0.050', moreThan(50)],
                    ]),
                ],
            ]),
        [intl.locale]
    )
}
const DEFAULT_PARAMETERS = new Map([
    [TEMPERATURE, 'LT-5'],
    [PRECIPITATION, 'GT0.025'],
    [ACCUMULATED_PRECIPITATION, 'GT0.025'],
])
function useTitles() {
    const intl = useIntl()
    const description = 'Component weather/ExceedanceProbability'

    return useMemo(
        () =>
            new Map([
                [
                    TEMPERATURE,
                    intl.formatMessage({
                        description,
                        defaultMessage: 'Temperature',
                    }),
                ],
                [
                    PRECIPITATION,
                    intl.formatMessage({
                        description,
                        defaultMessage: 'Precipitation',
                    }),
                ],
                [
                    ACCUMULATED_PRECIPITATION,
                    intl.formatMessage({
                        description,
                        defaultMessage: 'Accumulated precipitation',
                    }),
                ],
            ]),
        [intl.locale]
    )
}
