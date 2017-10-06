import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Container, PillSet, Pill } from '~/components/pill'
import { DropdownFromOptions, DayPicker } from '~/components/controls'
import { DateElement } from '~/components/time'
import styles from './ExceedenceProbability.css'
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
} from '~/services/msc/naefs'

const TEMPERATURE = 'TEMPERATURE'

const TITLES = new Map([
    [TEMPERATURE, 'Temperature'],
    [PRECIPITATION, 'Precipitation'],
    [ACCUMULATED_PRECIPITATION, 'Accumulated precipitation'],
])

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
        run: 0,
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

function Subtitle({ children: [from, to] }) {
    return (
        <h5 className={styles.Title} style={{ marginTop: 0 }}>
            <div>For forecast from</div>
            {from}
            <div>to</div>
            {to}
        </h5>
    )
}

const DEFAULT_PARAMETERS = new Map([
    [TEMPERATURE, 'LT-5'],
    [PRECIPITATION, 'GT0.025'],
    [ACCUMULATED_PRECIPITATION, 'GT0.025'],
])

class DayPickerContainer extends Component {
    render() {
        const { children, ...props } = this.props

        return (
            <DayPicker container={this} {...props}>
                {children}
            </DayPicker>
        )
    }
}

export default class ExceedenceProbability extends Component {
    static propTypes = {
        date: PropTypes.instanceOf(Date).isRequired,
    }
    state = {}
    constructor(props) {
        super(props)

        this.state = {
            product: TEMPERATURE,
            param: DEFAULT_PARAMETERS.get(TEMPERATURE),
            from: addDays(this.props.date, 5),
            to: addDays(this.props.date, 6),
        }
    }
    get realProduct() {
        const { product, param } = this.state

        if (product !== TEMPERATURE) {
            return product
        }

        if (PARAMETERS.get(MINIMUM_TEMPERATURE).has(param)) {
            return MINIMUM_TEMPERATURE
        } else {
            return MAXIMUM_TEMPERATURE
        }
    }
    handleParamChange = param => param && this.setState({ param })
    handleDateRangeChange = dates => this.setState(dates)
    handleActivateType = index => {
        // Use "TITLES" because index reflects which tab clicked
        const [product] = Array.from(TITLES)[index]

        this.setState({
            product,
            param: DEFAULT_PARAMETERS.get(product),
        })
    }
    handleFromChange = from => this.setState({ from })
    handleToChange = to => this.setState({ to })
    render() {
        const { product, param, from, to } = this.state
        const { date } = this.props
        const activeIndex = Array.from(TITLES.keys()).indexOf(product)
        function fromDisabledDays(day) {
            return !isWithinRange(day, date, addDays(date, 6))
        }
        function toDisabledDays(day) {
            return !isWithinRange(day, addDays(date, 6), addDays(date, 10))
        }

        return (
            <section>
                <Container>
                    <PillSet
                        onActivate={this.handleActivateType}
                        activeIndex={activeIndex}>
                        {Array.from(TITLES).map(([product, title]) => (
                            <Pill key={product}>{title}</Pill>
                        ))}
                    </PillSet>
                </Container>
                <Title product={product}>
                    <DropdownFromOptions
                        value={param}
                        options={OPTIONS.get(product)}
                        onChange={this.handleParamChange}
                    />
                </Title>
                <Subtitle>
                    <DayPickerContainer
                        date={from}
                        disabledDays={fromDisabledDays}
                        onChange={this.handleFromChange}>
                        <DateElement value={from} />
                    </DayPickerContainer>
                    <DayPickerContainer
                        date={to}
                        disabledDays={toDisabledDays}
                        onChange={this.handleToChange}>
                        <DateElement value={to} />
                    </DayPickerContainer>
                </Subtitle>
                <Image {...this.state} product={this.realProduct} date={date} />
            </section>
        )
    }
}
