import React from 'react'
import Application from '~/components/application'
import { Route, Redirect, Switch } from 'react-router-dom'
import { PrivateRoute, createRoute } from '~/router'
import { AvalancheCanada as Navbar } from '~/containers/Navbar'
import Highlight from '~/containers/Highlight'
import Footer from '~/components/footer'
import MainMap from './Map'
import AtesMap from './AtesMap'
import Tutorial from './Tutorial'
import * as MINTableLayouts from '~/layouts/min/table'
import WIPPageRoutes from './routes/WIPPages'
import GenericPageRoutes from './routes/GenericPages'
import StaticPageRoutes from './routes/StaticPages'
import * as FeedContainers from './Feed'
import * as FeedPostContainers from '~/containers/feed'
import Forecast from '~/containers/Forecast'
import Forecasts from '~/containers/Forecasts'
import ArchiveForecast from '~/containers/ArchiveForecast'
import HotZoneReport from '~/containers/HotZoneReport'
import ArchiveHotZoneReport from '~/containers/ArchiveHotZoneReport'
import MountainInformationNetworkSubmission from '~/containers/MountainInformationNetworkSubmission'
import Ast from './Ast'
import WeatherStation from '~/containers/WeatherStation'
import WeatherStationList from '~/containers/WeatherStationList'
import Glossary from '~/containers/Glossary'
import Submit from '~/containers/min/Form'

export default function AvalancheCanada() {
    return (
        <Application>
            <Navbar />
            <Highlight />
            <Switch>
                {/* <LoginRoute /> */}
                {/* <Route path="/login-complete" render={noop} /> */}
                <PrivateRoute
                    path="/mountain-information-network/submit"
                    component={Submit}
                />
                {ComponentRoutes}
                {WIPPageRoutes}
                {GenericPageRoutes}
                {StaticPageRoutes}
                <Redirect exact from="/" to="/map" />
            </Switch>
            <Switch>
                {Array.from(WITHOUT_FOOTER_PATHS).map(path =>
                    <Route key={path} path={path} component={null} />
                )}
                <Route component={Footer} />
            </Switch>
        </Application>
    )
}

const WITHOUT_FOOTER_PATHS = new Set([
    '/map',
    '/map/ates',
    '/trip-planner',
    '/incidents',
    '/tutoriel',
    '/auction',
])

const PATH_TO_COMPONENT = new Map([
    ['/map/:type?/:name?', MainMap],
    ['/map/ates', AtesMap],
    ['/glossary', Glossary],
    ['/tutorial', Tutorial],
    ['/weather/stations/:id', WeatherStation],
    ['/weather/stations', WeatherStationList],
    ['/hot-zone-reports/:name/:uid?', HotZoneReport],
    ['/hot-zone-reports/archives/:name?/:date?', ArchiveHotZoneReport],
    ['/forecasts/:name/:date?', Forecast],
    ['/forecasts', Forecasts],
    ['/forecasts/archives/:name?/:date?', ArchiveForecast],
    ['/blogs', FeedContainers.BlogFeed],
    ['/blogs/:uid', FeedPostContainers.BlogPost],
    ['/news', FeedContainers.NewsFeed],
    ['/news/:uid', FeedPostContainers.NewsPost],
    ['/events', FeedContainers.EventFeed],
    ['/events/:uid', FeedPostContainers.EventPost],
    ['/mountain-information-network/submissions', MINTableLayouts.Page],
    [
        '/mountain-information-network/submissions/:id',
        MountainInformationNetworkSubmission,
    ],
    ['/training/:type', Ast],
])

const ComponentRoutes = Array.from(PATH_TO_COMPONENT).map(([path, component]) =>
    createRoute({ path, component })
)
