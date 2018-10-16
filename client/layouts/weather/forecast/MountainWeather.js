import React, { Component } from 'react'
import { Router, Link, navigate } from '@reach/router'
import isToday from 'date-fns/is_today'
import { Page, Content, Header, Main, Aside } from 'components/page'
import Sidebar from './Sidebar'
import Forecast from './Forecast'
import Footer from './Footer'
import * as articles from './articles'
import * as utils from 'utils/search'

export default class Weather extends Component {
    render() {
        const title = <Link to={this.props.uri}>Mountain Weather Forecast</Link>

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
}

// Subroutes
function ForecastRoute({ date }) {
    date = utils.parseDate(date)

    return <Forecast date={date} onDateChange={handleDateChange} />
}

// Utis
function handleDateChange(date) {
    let path = '/weather/forecast'

    if (!isToday(date)) {
        path = `${path}/${utils.formatDate(date)}`
    }

    navigate(path)
}
