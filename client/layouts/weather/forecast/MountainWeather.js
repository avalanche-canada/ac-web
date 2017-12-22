import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect, Link } from 'react-router-dom'
import { Page, Content, Header, Main, Aside } from 'components/page'
import Sidebar from './Sidebar'
import Forecast from './Forecast'
import Footer from './Footer'
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
} from './articles'

export default class Weather extends PureComponent {
    static propTypes = {
        children: PropTypes.node.isRequired,
        match: PropTypes.object.isRequired,
    }
    render() {
        const { match: { url, path } } = this.props
        const title = <Link to={url}>Mountain Weather Forecast</Link>

        return (
            <Page>
                <Header title={title} />
                <Content>
                    <Main>
                        <Switch>
                            <Redirect
                                exact
                                from={url}
                                to={`${path}/forecast`}
                            />
                            <Route
                                path={`${path}/forecast/:date?`}
                                component={Forecast}
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
