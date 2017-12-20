import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { WeatherForecast as Container } from 'prismic/containers'
import { Article } from 'components/page'
import { Status } from 'components/misc'
import { Muted } from 'components/text'
import { DateElement } from 'components/time'
import { Metadata, Entry } from 'components/metadata'
import Forecast from 'components/weather'
import { DayPicker } from 'components/controls'
import * as utils from 'utils/search'

export default class WeatherForecast extends PureComponent {
    static propTypes = {
        match: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
    }
    state = {
        date: utils.parseDate(this.props.match.params.date),
    }
    handleDateChange = date => {
        this.setState({ date }, () => {
            this.props.history.push(
                `/weather/forecast/${utils.formatDate(date)}`
            )
        })
    }
    renderMetadata(forecast) {
        const { date } = this.state

        return (
            <Metadata>
                <Entry term="Date" sideBySide>
                    <DayPicker
                        date={date}
                        onChange={this.handleDateChange}
                        container={this}>
                        <DateElement value={date} />
                    </DayPicker>
                </Entry>
                {forecast && (
                    <Entry term="Issued at" sideBySide>
                        {forecast.issued || '04:00'} PST/PDT
                    </Entry>
                )}
                {forecast &&
                    forecast.handle && (
                        <Entry term="Created by" sideBySide>
                            {forecast.handle}
                        </Entry>
                    )}
            </Metadata>
        )
    }
    renderContent(status, forecast) {
        if (!status.isLoaded) {
            return null
        }

        if (!forecast) {
            return (
                <Muted>
                    No weather forecast available for{' '}
                    <DateElement value={this.state.date} />
                    .
                </Muted>
            )
        }

        return <Forecast forecast={forecast} />
    }
    children = ({ status, forecast }) => {
        return [
            this.renderMetadata(forecast),
            <Status {...status} />,
            this.renderContent(status, forecast),
        ]
    }
    render() {
        return (
            <Article>
                <Container date={this.state.date}>{this.children}</Container>
            </Article>
        )
    }
}
