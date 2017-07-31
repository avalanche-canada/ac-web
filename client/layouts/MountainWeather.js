import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect, Link } from 'react-router-dom'
import Alert, { WARNING } from '~/components/alert'
import { Page, Content, Header, Main, Aside } from '~/components/page'
import { Sidebar } from '~/components/page/weather'
import Container, { Forecast } from '~/containers/WeatherForecast'
import {
    // HourlyPrecipitation,
    // Precipitation12h,
    // Temperatures,
    // Winds,
    // SurfaceMaps,
    // OtherMaps,
    // Radar,
    // Satellite,
    // ActualTemperatures,
    Warnings,
} from '~/components/page/weather/articles'

Weather.propTypes = {
    children: PropTypes.node.isRequired,
    match: PropTypes.object.isRequired,
}

function forecast({ match }) {
    return <Forecast date={match.params.date} />
}

function WeatherLoopIssueWarning() {
    return (
        <Alert type={WARNING}>
            <h2>
                We are currently experiencing some issues with weather loops
                image generation!
            </h2>
            <h3>
                This product will be available as soon as we solve the issue.<br />Thanks
                for your patience!
            </h3>
        </Alert>
    )
}

export default function Weather({ match: { url, path } }) {
    const title = <Link to={url}>Mountain Weather Forecast</Link>

    return (
        <Page>
            <Header title={title} />
            <Content>
                <Main>
                    <Container>
                        <Switch>
                            <Redirect
                                exact
                                from={url}
                                to={`${path}/forecast`}
                            />
                            <Route
                                path={`${path}/forecast/:date?`}
                                render={forecast}
                            />
                            <Route
                                path={`${path}/hourly-precipitation`}
                                component={WeatherLoopIssueWarning}
                            />
                            <Route
                                path={`${path}/12h-precipitation`}
                                component={WeatherLoopIssueWarning}
                            />
                            <Route
                                path={`${path}/temperatures`}
                                component={WeatherLoopIssueWarning}
                            />
                            <Route
                                path={`${path}/winds`}
                                component={WeatherLoopIssueWarning}
                            />
                            <Route
                                path={`${path}/surface-maps`}
                                component={WeatherLoopIssueWarning}
                            />
                            <Route
                                path={`${path}/other-maps`}
                                component={WeatherLoopIssueWarning}
                            />
                            <Route
                                path={`${path}/radar`}
                                component={WeatherLoopIssueWarning}
                            />
                            <Route
                                path={`${path}/satellite`}
                                component={WeatherLoopIssueWarning}
                            />
                            <Route
                                path={`${path}/actual-temperatures`}
                                component={WeatherLoopIssueWarning}
                            />
                            <Route
                                path={`${path}/warnings`}
                                component={Warnings}
                            />
                        </Switch>
                    </Container>
                </Main>
                <Aside>
                    <Sidebar />
                </Aside>
            </Content>
        </Page>
    )
}
