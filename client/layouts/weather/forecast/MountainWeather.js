import React from 'react'
import { Router, Link } from '@reach/router'
import isToday from 'date-fns/is_today'
import { FormattedMessage } from 'react-intl'
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
import { Generic } from 'prismic/layouts'
import { Provider } from 'services/msc/loop/metadata/context'

export default function Weather({ uri }) {
    const [visible, hide] = useVisibility('mwf-warning')
    const title = (
        <Link to={uri}>
            <FormattedMessage
                description="Layout weather/forecast/MountainWeather"
                defaultMessage="Mountain Weather Forecast"
            />
        </Link>
    )

    return (
        <Page>
            <Header title={title} />
            <Content>
                <Main>
                    {visible && (
                        <Warning onDismiss={hide}>
                            <Generic uid="mountain-weather-forecast-warning" />
                        </Warning>
                    )}
                    <Provider>
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
                    </Provider>
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
