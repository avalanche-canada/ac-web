import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from '@reach/router'
import isToday from 'date-fns/is_today'
import startOfYesterday from 'date-fns/start_of_yesterday'
import { Article } from 'components/page'
import { Muted, Loading } from 'components/text'
import { Metadata, Entry } from 'components/metadata'
import Forecast from 'components/weather'
import { DayPicker } from 'components/controls'
import { mw } from 'prismic/params'
import { useDocument } from 'prismic/hooks'
import { DateParam } from 'hooks/params'
import { FormattedMessage, useIntl } from 'react-intl'
import { DATE } from 'constants/intl'

// TODO: Reorganize using Context and create Components

WeatherForecast.propTypes = {
    date: PropTypes.instanceOf(Date),
    onDateChange: PropTypes.func.isRequired,
}

export default function WeatherForecast({ date = new Date(), onDateChange }) {
    const intl = useIntl()
    const dateString = intl.formatDate(date, DATE)
    const [document, pending] = useDocument(mw.forecast(date))
    const notFound = !pending && !document
    const data = document?.data

    return (
        <Article>
            <Metadata>
                <Entry
                    term={
                        <FormattedMessage
                            description="Layout weather/forecast/Forecast"
                            defaultMessage="Date"
                        />
                    }
                    horizontal>
                    <DayPicker date={date} onChange={onDateChange} />
                </Entry>
                {notFound || (
                    <Entry
                        term={
                            <FormattedMessage
                                description="Layout weather/forecast/Forecast"
                                defaultMessage="Issued at"
                            />
                        }
                        horizontal>
                        {data?.issued || '04:00'} PST/PDT
                    </Entry>
                )}
                {notFound || (
                    <Entry
                        term={
                            <FormattedMessage
                                description="Layout weather/forecast/Forecast"
                                defaultMessage="Created by"
                            />
                        }
                        horizontal>
                        {pending ? <Loading /> : data?.handle}
                    </Entry>
                )}
            </Metadata>
            {pending ? (
                <Loading>
                    <FormattedMessage
                        description="Layout weather/forecast/Forecast"
                        defaultMessage="Loading mountain weather forecast for {date}..."
                        values={{
                            date: dateString,
                        }}
                    />
                </Loading>
            ) : document ? null : (
                <Fragment>
                    <Muted>
                        <FormattedMessage
                            description="Layout weather/forecast/Forecast"
                            defaultMessage="No weather forecast available yet for {date}"
                            values={{
                                date: dateString,
                            }}
                        />
                    </Muted>
                    {isToday(date) && (
                        <Muted>
                            <FormattedMessage
                                description="Layout weather/forecast/Forecast"
                                defaultMessage="Weather forecasts are usually published at 4:00 PST, read yesterday's weather forecast <link>here</link>."
                                values={{
                                    link(text) {
                                        const to = DateParam.format(
                                            startOfYesterday()
                                        )

                                        return <Link to={to}>{text}</Link>
                                    },
                                }}
                            />
                        </Muted>
                    )}
                </Fragment>
            )}
            {data && <Forecast forecast={data} />}
        </Article>
    )
}
