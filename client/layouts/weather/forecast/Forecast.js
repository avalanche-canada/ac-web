import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Document } from 'prismic/containers'
import { Article } from 'components/page'
import { Muted, Loading } from 'components/text'
import { DateElement } from 'components/time'
import { Metadata, Entry } from 'components/metadata'
import Forecast from 'components/weather'
import { DayPicker } from 'components/controls'
import { mw } from 'prismic/params'

// TODO: Reorganize using Context and create Components

export default class WeatherForecast extends Component {
    static propTypes = {
        date: PropTypes.instanceOf(Date),
        onDateChange: PropTypes.func.isRequired,
    }
    static defaultProps = {
        date: new Date(),
    }
    renderMetadata(forecast) {
        const { date } = this.props

        return (
            <Metadata>
                <Entry term="Date" sideBySide>
                    <DayPicker date={date} onChange={this.props.onDateChange}>
                        <DateElement value={date} />
                    </DayPicker>
                </Entry>
                <Entry term="Issued at" sideBySide>
                    {forecast?.data?.issued || '04:00'} PST/PDT
                </Entry>
                <Entry term="Created by" sideBySide>
                    {forecast?.data?.handle}
                </Entry>
            </Metadata>
        )
    }
    renderChildren = ({ loading, document }) => {
        const { date } = this.props

        return (
            <Fragment>
                {this.renderMetadata(document)}
                {loading ? (
                    <Loading>
                        Loading mountain weather forecast for{' '}
                        <DateElement value={date} />
                        ...
                    </Loading>
                ) : document ? null : (
                    <Muted>
                        No weather forecast available for{' '}
                        <DateElement value={date} />.
                    </Muted>
                )}
                {document && <Forecast forecast={document.data} />}
            </Fragment>
        )
    }
    render() {
        const { date } = this.props

        return (
            <Article>
                <Document {...mw.forecast(date)}>
                    {this.renderChildren}
                </Document>
            </Article>
        )
    }
}
