import React, { lazy } from 'react'
import { Router, Redirect } from '@reach/router'
import { FormattedMessage } from 'react-intl'
import Bundle from 'components/Bundle'
import WeatherStation from './station/WeatherStation'
import WeatherStationList from './station/WeatherStationList'
import { Page } from 'layouts/pages'
import { Main, Content, Header, Aside } from 'components/page'
import WeatherSidebar from './forecast/Sidebar'
import styles from 'layouts/glossary/Glossary.module.css'

export default function Weather() {
    return (
        <Router>
            <Redirect from="/" to="weather/forecast" />
            <MountainWeatherForecast path="forecast/*" />
            <WeatherStationList path="stations" />
            <WeatherStation path="stations/:id" />
            <WeatherGlossary path="glossary" uid="weather" />
        </Router>
    )
}

// Subroutes
const MountainWeather = lazy(() => import('./forecast/MountainWeather'))
const Glossary = lazy(() =>
    import('layouts/glossary/layouts').then(glossary =>
        Promise.resolve({ default: glossary.Glossary })
    )
)

function MountainWeatherForecast(props) {
    return (
        <Bundle>
            <MountainWeather {...props} />
        </Bundle>
    )
}

function WeatherGlossary(props) {
    const title = (
        <FormattedMessage description="Layout weather" defaultMessage="Weather Glossary" />
    )

    return (
        <Page className={styles.Page}>
            <Header title={title} />
            <Content>
                <Main>
                    <Bundle>
                        <Glossary {...props} />
                    </Bundle>
                </Main>
                <Aside>
                    <WeatherSidebar />
                </Aside>
            </Content>
        </Page>
    )
}
