import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from '@reach/router'
import isToday from 'date-fns/is_today'
import startOfYesterday from 'date-fns/start_of_yesterday'
import { formatDate } from 'utils/search'
import { Article } from 'components/page'
import { Muted, Loading } from 'components/text'
import { DateElement } from 'components/time'
import { Metadata, Entry } from 'components/metadata'
import Forecast from 'components/weather'
import { DayPicker } from 'components/controls'
import { mw } from 'prismic/params'
import { useDocument } from 'prismic/hooks'

// TODO: Reorganize using Context and create Components

WeatherForecast.propTypes = {
    date: PropTypes.instanceOf(Date),
    onDateChange: PropTypes.func.isRequired,
}

export default function WeatherForecast({ date = new Date(), onDateChange }) {
    const [document, pending] = useDocument(mw.forecast(date))
    const data = document?.data

    return (
        <Article>
            <Metadata>
                <Entry term="Date" sideBySide>
                    <DayPicker date={date} onChange={onDateChange} />
                </Entry>
                <Entry term="Issued at" sideBySide>
                    {data?.issued || '04:00'} PST/PDT
                </Entry>
                <Entry term="Created by" sideBySide>
                    {data?.handle || 'Loading...'}
                </Entry>
            </Metadata>
            {pending ? (
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
                            Weather forecasts are usually published at 4:00 PST,
                            read yesterday's weather forecast{' '}
                            <Link to={formatDate(startOfYesterday())}>
                                here
                            </Link>
                            .
                        </Muted>
                    )}
                </Fragment>
            )}
            {data && <Forecast forecast={data} />}
        </Article>
    )
}
