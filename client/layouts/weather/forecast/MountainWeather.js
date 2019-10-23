import React from 'react'
import { Router, Link } from '@reach/router'
import isToday from 'date-fns/is_today'
import { Page, Content, Header, Main, Aside } from 'components/page'
import Sidebar from './Sidebar'
import Forecast from './Forecast'
import Footer from './Footer'
import * as articles from './articles'
import { DateParam } from 'hooks/params'
import { path } from 'utils/url'

export default function Weather({ uri }) {
    const title = <Link to={uri}>Mountain Weather Forecast</Link>

    return (
        <Page>
            <Header title={title} />
            <Content>
                <Main>
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
