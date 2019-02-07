import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from '@reach/router'
import isToday from 'date-fns/is_today'
import startOfYesterday from 'date-fns/start_of_yesterday'
import { formatDate } from 'utils/search'
import { Document } from 'prismic/containers'
import { Article } from 'components/page'
import { Muted, Loading } from 'components/text'
import { DateElement } from 'components/time'
import { Metadata, Entry } from 'components/metadata'
import Forecast from 'components/weather'
import { DayPicker } from 'components/controls'
import { mw } from 'prismic/params'

// TODO: Reorganize using Context and create Components

WeatherForecast.propTypes = {
    date: PropTypes.instanceOf(Date),
    onDateChange: PropTypes.func.isRequired,
}

WeatherForecast.defaultProps = {
    date: new Date(),
}

export default function WeatherForecast({ date, onDateChange }) {
    return (
        <Document {...mw.forecast(date)}>
            {({ loading, document }) => {
                return (
                    <Article>
                        <Metadata>
                            <Entry term="Date" sideBySide>
                                <DayPicker date={date} onChange={onDateChange}>
                                    <DateElement value={date} />
                                </DayPicker>
                            </Entry>
                            <Entry term="Issued at" sideBySide>
                                {document?.data?.issued || '04:00'} PST/PDT
                            </Entry>
                            <Entry term="Created by" sideBySide>
                                {document?.data?.handle || 'Loading...'}
                            </Entry>
                        </Metadata>
                        {loading ? (
                            <Loading>
                                Loading mountain weather forecast for{' '}
                                <DateElement value={date} />
                                ...
                            </Loading>
                        ) : document ? null : (
                            <Fragment>
                                <Muted>
                                    No weather forecast available yet for{' '}
                                    <DateElement value={date} />.
                                </Muted>
                                {isToday(date) && (
                                    <Muted>
                                        Weather forecasts are usually published
                                        at 4:00 PST, read yesterday's weather
                                        forecast{' '}
                                        <Link
                                            to={formatDate(startOfYesterday())}>
                                            here
                                        </Link>
                                        .
                                    </Muted>
                                )}
                            </Fragment>
                        )}
                        {document && <Forecast forecast={document.data} />}
                    </Article>
                )
            }}
        </Document>
    )
}
