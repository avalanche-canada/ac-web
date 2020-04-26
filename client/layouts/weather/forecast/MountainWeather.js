import React from 'react'
import { Router, Link } from '@reach/router'
import isToday from 'date-fns/is_today'
import { Content, Header, Main, Aside } from 'components/page'
import { Warning } from 'components/alert'
import { Page } from 'layouts/pages'
import Sidebar from './Sidebar'
import Forecast from './Forecast'
import Footer from './Footer'
import * as articles from './articles'
import { DateParam } from 'hooks/params'
import { useVisibility } from 'hooks/session'
import { path } from 'utils/url'

export default function Weather({ uri }) {
    const title = <Link to={uri}>Mountain Weather Forecast</Link>
    const [visible, hide] = useVisibility('mwf-covid-warning')

    return (
        <Page>
            <Header title={title} />
            <Content>
                <Main>
                    {visible && (
                        <Warning onDismiss={hide}>
                            The Meteorological Service of Canada will continue
                            to produce the mountain weather forecast as
                            regularly as we can during the pandemic.
                            Occasionally the forecast may be shorter than usual
                            and it’s possible that some days it might not be
                            issued at all. Content will shift seasonally to
                            address provincial concerns. We will do our best to
                            keep the daily product as consistent as possible.
                        </Warning>
                    )}
                    <Router>
                        <ForecastRoute path="/" />
                        <ForecastRoute path=":date" />
                        <articles.HourlyPrecipitation path="hourly-precipitation" />
                        <articles.Precipitation12h path="12h-precipitation" />
                        <articles.Temperatures path="temperatures" />
                        <articles.Winds path="winds" />
                        <articles.SurfaceMaps path="surface-maps" />
                        <articles.OtherMaps path="other-maps" />
                        <articles.Radar path="radar" />
                        <articles.Satellite path="satellite" />
                        <articles.ActualTemperatures path="actual-temperatures" />
                        <articles.Warnings path="warnings" />
                    </Router>
                    <Footer />
                </Main>
                <Aside>
                    <Sidebar />
                </Aside>
            </Content>
        </Page>
    )
}

// Subroutes
function ForecastRoute({ date, navigate }) {
    function handleDateChange(date) {
        date = isToday(date) ? undefined : DateParam.format(date)

        navigate(path('/weather/forecast', date))
    }

    return (
        <Forecast
            date={DateParam.parse(date)}
            onDateChange={handleDateChange}
        />
    )
}
