import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Container, PillSet, Pill } from '~/components/pill'
import { DropdownFromOptions, DateRange } from '~/components/controls'
import parseDate from 'date-fns/parse'
import Panel from '~/components/panel'

const TEMPERATURE = 'TEMPERATURE'
const PRECIPITATION = 'PRECIPITATION'
const ACCUMULATED_PRECIPITATION = 'ACCUMULATED_PRECIPITATION'
const TYPES = [TEMPERATURE, PRECIPITATION, ACCUMULATED_PRECIPITATION]
const Options = new Map([
    [
        TEMPERATURE,
        new Map([
            [0, '> 0°C'],
            [1, '< 0°C'],
            [2, '< 5°C'],
            [3, '< 15°C'],
            [4, '< 30°C'],
        ]),
    ],
    [
        PRECIPITATION,
        new Map([[0, '> 2mm'], [1, '> 5mm'], [2, '> 10mm'], [3, '> 25mm']]),
    ],
    [
        ACCUMULATED_PRECIPITATION,
        new Map([[0, '> 2mm'], [1, '> 5mm'], [2, '> 10mm'], [3, '> 25mm']]),
    ],
])
const Titles = new Map([
    [TEMPERATURE, 'Temperature'],
    [PRECIPITATION, 'Precipitation'],
    [ACCUMULATED_PRECIPITATION, 'Accumulated precipitation'],
])

Image.propTypes = {
    type: PropTypes.oneOf(TYPES).isRequired,
    from: PropTypes.instanceOf(Date).isRequired,
    to: PropTypes.instanceOf(Date).isRequired,
    value: PropTypes.string.isRequired,
}

function Image({ type }) {
    // , from, to, value
    let path = null

    switch (type) {
        case TEMPERATURE:
            path = 'GZ500/CMC_NCEP/2017083100_096.gif'
            break
        case PRECIPITATION:
            path = 'GZ500/CMC_NCEP/2017083100_096.gif'
            break
        case ACCUMULATED_PRECIPITATION:
            path = 'GZ500/CMC_NCEP/2017083100_096.gif'
            break
        default:
            throw new Error(`type = ${type} not recognized.`)
    }

    const src = `//collaboration.cmc.ec.gc.ca/cmc/ensemble/cartes/data/cartes/${path}`

    return <img src={src} />
}

function computeTitle({ type, value }) {
    const text = Options.get(type).get(value)

    switch (type) {
        case TEMPERATURE:
            return `Probability of temperature ${text} at least one day`
        case PRECIPITATION:
            return `Probability of precipitation ${text} at least one day`
        case ACCUMULATED_PRECIPITATION:
            return `Probability of precipitation accumulation ${text} for the whole period`
        default:
            throw new Error(`type = ${type} not recognized.`)
    }
}

export default class ExceedenceProbability extends PureComponent {
    state = {
        type: TEMPERATURE,
        from: new Date(),
        to: new Date(),
        value: 0,
    }
    handleValueChange = value => this.setState({ value })
    handleDateRangeChange = dates => this.setState(dates)
    handleActivateType = index => {
        this.setState({
            value: 0,
            type: TYPES[index],
        })
    }
    render() {
        const { type, from, to, value } = this.state
        const activeIndex = TYPES.indexOf(type)
        const title = computeTitle(this.state)

        return (
            <section>
                <Container>
                    <PillSet
                        onActivate={this.handleActivateType}
                        activeIndex={activeIndex}>
                        {Array.from(Titles).map(([type, title]) =>
                            <Pill key={type}>
                                {title}
                            </Pill>
                        )}
                    </PillSet>
                </Container>
                <Panel expandable header={title}>
                    <label>
                        Forecast extent
                        <DateRange
                            from={from && parseDate(from)}
                            to={to && parseDate(to)}
                            onChange={this.handleDateRangeChange}
                        />
                    </label>
                    <DropdownFromOptions
                        value={value}
                        options={Options.get(type)}
                        onChange={this.handleValueChange}
                    />
                </Panel>
                <Image {...this.state} />
            </section>
        )
    }
}
