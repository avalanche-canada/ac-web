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
    PRECIPITATION,
    ACCUMULATED_PRECIPITATION,
    PRODUCTS,
    PARAMETERS,
    format,
} from '~/services/msc/naefs'

const DEFAULT_PRODUCT = MAXIMUM_TEMPERATURE

const Titles = new Map([
    [MAXIMUM_TEMPERATURE, 'Temperature'],
    [PRECIPITATION, 'Precipitation'],
    [ACCUMULATED_PRECIPITATION, 'Accumulated precipitation'],
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
        case MAXIMUM_TEMPERATURE:
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
    constructor(props) {
        super(props)

        this.state = {
            product: DEFAULT_PRODUCT,
            param: PARAMETERS.get(DEFAULT_PRODUCT)
                .keys()
                .next().value,
            from: addDays(this.props.date, 5),
            to: addDays(this.props.date, 6),
        }
    }
    handleParamChange = param => param && this.setState({ param })
    handleDateRangeChange = dates => this.setState(dates)
    handleActivateType = index => {
        const [product] = Array.from(Titles)[index]

        this.setState({
            product,
            param: PARAMETERS.get(product)
                .keys()
                .next().value,
        })
    }
    handleFromChange = from => this.setState({ from })
    handleToChange = to => this.setState({ to })
    render() {
        const { product, param, from, to } = this.state
        const { date } = this.props
        const activeIndex = Array.from(Titles.keys()).indexOf(product)
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
                        {Array.from(Titles).map(([product, title]) => (
                            <Pill key={product}>{title}</Pill>
                        ))}
                    </PillSet>
                </Container>
                <Title product={product}>
                    <DropdownFromOptions
                        value={param}
                        options={PARAMETERS.get(product)}
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
                <Image {...this.state} date={date} />
            </section>
        )
    }
}
