import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import isToday from 'date-fns/is_today'
import endOfYesterday from 'date-fns/end_of_yesterday'
import subDays from 'date-fns/sub_days'
import addDays from 'date-fns/add_days'
import { useIntl, FormattedMessage } from 'react-intl'
import { useForecasts } from 'hooks/async/api/products'
import { Content, Header, Main } from 'components/page'
import { Page } from 'layouts/pages'
import * as Components from 'layouts/products/forecast'
import * as Footer from 'layouts/products/forecast/Footer'
import * as Texts from 'components/text'
import { Warning } from 'components/alert'
import { Metadata, Entry } from 'components/metadata'
import { DateElement } from 'components/time'
import Shim from 'components/Shim'
import { DayPicker } from 'components/controls'
import Pager, { Previous, Next } from 'components/pager'
import * as Async from 'contexts/async'
import { DateParam } from 'hooks/params'
import * as urls from 'utils/url'

ArchiveForecast.propTypes = {
    date: PropTypes.instanceOf(Date),
    onDateChange: PropTypes.func.isRequired,
}

export default function ArchiveForecast({ date, onDateChange }) {
    const intl = useIntl()
    const placeholder = intl.formatMessage({
        defaultMessage: 'Select a date',
    })
    const title = (
        <FormattedMessage
            description="Layout pages/ArchiveForecast"
            defaultMessage="Forecast Archive"
        />
    )

    return (
        <Page>
            <Header title={title} />
            <Content>
                <Main>
                    <Metadata>
                        <Entry>
                            <DayPicker
                                date={date}
                                placeholder={placeholder}
                                onChange={onDateChange}
                                disabledDays={{
                                    after: endOfYesterday(),
                                }}
                            />
                        </Entry>
                    </Metadata>
                    {date ? (
                        <ForecastContent date={date} />
                    ) : (
                        <Texts.Muted>
                            <FormattedMessage
                                description="Layout pages/ArchiveForecast"
                                defaultMessage="Select a forecast date."
                            />
                        </Texts.Muted>
                    )}
                </Main>
            </Content>
        </Page>
    )
}

// Utils
function ForecastContent({ date }) {
    return (
        <Async.Provider value={useForecasts(date)}>
            <Async.Pending>
                <Texts.Loading>
                    <FormattedMessage
                        description="Layout pages/ArchiveForecast"
                        defaultMessage="Loading archived forecasts..."
                    />
                </Texts.Loading>
            </Async.Pending>
            <Async.Found>
                {forecasts =>
                    forecasts.map(forecast => (
                        <Components.Provider key={forecast.id} value={forecast}>
                            <ForecastLayout date={date} />
                        </Components.Provider>
                    ))
                }
            </Async.Found>
            <Async.HTTPError>
                <DisplayHTTPError />
            </Async.HTTPError>
        </Async.Provider>
    )
}
function DisplayHTTPError({ error }) {
    return <Texts.Error>{error.payload.message}</Texts.Error>
}
function ForecastLayout({ date }) {
    return (
        <Fragment>
            <Components.Metadata />
            <Shim top>
                <Warning>
                    <FormattedMessage
                        description="Layout pages/ArchiveForecast"
                        defaultMessage="This is an archived avalanche bulletin."
                    />
                </Warning>
            </Shim>
            <Components.Headline />
            <Components.TabSet />
            <ForecastPager date={date} />
            <Components.Footer>
                <Footer.DangerRatings />
                <Footer.Disclaimer />
            </Components.Footer>
        </Fragment>
    )
}

function ForecastPager({ date }) {
    const previous = subDays(date, 1)
    const next = addDays(date, 1)

    return (
        <Pager>
            <Previous to={createLink(previous)}>
                <DateElement value={previous} />
            </Previous>
            {isToday(date) || (
                <Next to={createLink(next)}>
                    <DateElement value={next} />
                </Next>
            )}
        </Pager>
    )
}

function createLink(date) {
    return urls.path('/forecasts/archives', DateParam.format(date))
}
