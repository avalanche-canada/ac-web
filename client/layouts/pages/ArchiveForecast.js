import * as React from 'react'
import PropTypes from 'prop-types'
import isToday from 'date-fns/is_today'
import endOfYesterday from 'date-fns/end_of_yesterday'
import subDays from 'date-fns/sub_days'
import addDays from 'date-fns/add_days'
import { useIntl, FormattedMessage } from 'react-intl'
import { useArchiveForecasts } from 'hooks/async/api/products'
import { Content, Header, Main, Section } from 'components/page'
import { Page } from 'layouts/pages'
import * as Components from 'layouts/products/forecast'
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
import Panel from 'components/panel'
import * as Products from 'constants/products'

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
    const disabledDays = {
        after: endOfYesterday(),
    }

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
                                disabledDays={disabledDays}
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
        <Async.Provider value={useArchiveForecasts(date)}>
            <Async.Pending>
                <Texts.Loading>
                    <FormattedMessage
                        description="Layout pages/ArchiveForecast"
                        defaultMessage="Loading archived forecasts..."
                    />
                </Texts.Loading>
            </Async.Pending>
            <Async.Found>
                <ForecastList />
            </Async.Found>
            <Async.HTTPError>
                <DisplayHTTPError />
            </Async.HTTPError>
            <ForecastPager date={date} />
        </Async.Provider>
    )
}
function DisplayHTTPError({ error }) {
    return <Texts.Error>{error.payload.message}</Texts.Error>
}
function ForecastList({ payload }) {
    const sections = useSections(payload)

    return Array.from(sections, ([owner, forecasts]) => (
        <Section key={owner} title={owner}>
            {forecasts.map(forecast => (
                <ForecastLayout key={forecast.id} forecast={forecast} />
            ))}
        </Section>
    ))
}
function ForecastLayout({ forecast }) {
    return (
        <Components.Provider key={forecast.id} value={forecast}>
            <Panel header={forecast.report.title}>
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
            </Panel>
        </Components.Provider>
    )
}

export function useSections(products) {
    return React.useMemo(() => {
        const forecasts = products.filter(p => Products.isKindOfForecast(p.type))
        const owners = Array.from(new Set(forecasts.map(f => f.owner.display))).sort()

        return new Map(
            owners.map(owner => [
                owner,
                forecasts.filter(f => f.owner.display === owner).sort(sortForecast),
            ])
        )
    }, [products])
}

// Utils
function sortForecast(a, b) {
    return a.report.title.localeCompare(b.report.title)
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
