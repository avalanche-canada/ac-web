import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Document } from 'prismic/containers'
import { Article } from 'components/page'
import { Muted, Loading } from 'components/text'
import { DateElement } from 'components/time'
import { Metadata, Entry } from 'components/metadata'
import Forecast from 'components/weather'
import { DayPicker } from 'components/controls'
import * as utils from 'utils/search'
import * as params from 'prismic/params'

// TODO: Reorganize using Context and create Components

export default class WeatherForecast extends Component {
    static propTypes = {
        match: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
        callback: PropTypes.func.isRequired,
    }
    state = {
        date: utils.parseDate(this.props.match.params.date),
    }
    get date() {
        return this.state.date || new Date()
    }
    handleDateChange = date => {
        this.setState({ date }, () => {
            this.props.history.push(
                `/weather/forecast/${utils.formatDate(date)}`
            )
        })
    }
    renderMetadata(forecast) {
        return (
            <Metadata>
                <Entry term="Date" sideBySide>
                    <DayPicker
                        date={this.date}
                        onChange={this.handleDateChange}
                        container={this}>
                        <DateElement value={this.date} />
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
    renderChildren = ({ loading, document }) => (
        <Fragment>
            {this.renderMetadata(document)}
            {loading ? (
                <Loading>
                    Loading mountain weather forecast for{' '}
                    <DateElement value={this.date} />
                    ...
                </Loading>
            ) : document ? null : (
                <Muted>
                    No weather forecast available for{' '}
                    <DateElement value={this.date} />.
                </Muted>
            )}
            {document && <Forecast forecast={document.data} />}
        </Fragment>
    )
    render() {
        return (
            <Article>
                <Document {...params.mw.forecast(this.state.date)}>
                    {this.renderChildren}
                </Document>
            </Article>
        )
    }
}
