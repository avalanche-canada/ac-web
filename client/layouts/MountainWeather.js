import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect, Link } from 'react-router-dom'
import { Page, Content, Header, Main, Aside } from 'components/page'
import { Sidebar } from 'components/page/weather'
import Container, { Forecast } from 'containers/WeatherForecast'
import {
    HourlyPrecipitation,
    Precipitation12h,
    Temperatures,
    Winds,
    SurfaceMaps,
    OtherMaps,
    Radar,
    Satellite,
    ActualTemperatures,
    Warnings,
} from 'components/page/weather/articles'

Weather.propTypes = {
    children: PropTypes.node.isRequired,
    match: PropTypes.object.isRequired,
}

function forecast({ match }) {
    return <Forecast date={match.params.date} />
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
                                component={HourlyPrecipitation}
                            />
                            <Route
                                path={`${path}/12h-precipitation`}
                                component={Precipitation12h}
                            />
                            <Route
                                path={`${path}/temperatures`}
                                component={Temperatures}
                            />
                            <Route path={`${path}/winds`} component={Winds} />
                            <Route
                                path={`${path}/surface-maps`}
                                component={SurfaceMaps}
                            />
                            <Route
                                path={`${path}/other-maps`}
                                component={OtherMaps}
                            />
                            <Route path={`${path}/radar`} component={Radar} />
                            <Route
                                path={`${path}/satellite`}
                                component={Satellite}
                            />
                            <Route
                                path={`${path}/actual-temperatures`}
                                component={ActualTemperatures}
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
