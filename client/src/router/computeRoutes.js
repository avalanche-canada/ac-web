import React from 'react'
import {Route, IndexRoute, IndexRedirect, Redirect} from 'react-router'
import moment from 'moment'
import {loadForType, loadForBookmark} from 'actions/prismic'
import {turnOnLayer} from 'actions/drawers'
import * as DRAWERS from 'containers/drawers';
import {
    Root,
    Map,
    About,
    Events,
    Event,
    Sponsors,
    Collaborators,
    Ambassadors,
    ProvidersTable,
    ProvidersForm,
    CoursesTable,
    CoursesForm,
    Weather,
    PrivacyPolicy,
    TermsOfUse,
    Forecast,
    ArchiveForecast,
    Archives,
    MountainInformationNetwork,
    MountainInformationNetworkSubmit,
    MountainInformationNetworkFAQ,
    MountainInformationNetworkSubmissionGuidelines,
    Training,
    Tutorial,
    Gear,
    Sled,
    Auction,
    Youth,
    PrismicPage,
    TripPlanner,
    IncidentsTable,
    IncidentDetails,
} from 'containers'
import {
    NewsFeed,
    NewsPost,
    BlogFeed,
    BlogPost,
    EventFeed,
    EventPost,
} from 'containers/feed'
import * as Layouts from 'layouts'
import {NotFound} from 'components/page'
import * as articles from 'components/page/weather/articles'
import {AvalancheCanadaFoundation} from 'containers/Navbar'
import * as LAYERS from 'constants/map/layers'

const YEAR = String(new Date().getFullYear())
const PAGINATION = {
    page: '1',
    pageSize: '25',
}

export default function computeRoutes(store) {
    const {dispatch} = store

    function handleRootRouteEntered() {
        const options = {
            pageSize: 100
        }

        dispatch(loadForBookmark('sponsors'))
        dispatch(loadForType('sponsor', options))
        dispatch(loadForType('staff', options))
    }

    function requireAuth(...args) {
        console.warn('requireAuth: finish implementation!')
    }

    function handleFeedEnter({location}, replace) {
        const {query} = location

        if (query.year) {
            return
        }

        query.year = YEAR

        replace({...location, query})
    }

    function handleIncidentsRouteEnter(props, replace) {
        ensurePagination(props, replace)
    }

    function ensurePagination({location}, replace) {
        const {query} = location

        if (query.page !== undefined && query.pageSize !== undefined) {
            return
        }

        replace({
            ...location,
            query: {
                ...query,
                ...PAGINATION,
            }
        })
    }

    function handleHotZoneReportRouteEnter() {
        dispatch(turnOnLayer(LAYERS.HOT_ZONE_REPORTS))
    }

    function handleForecastRouteEnter() {
        dispatch(turnOnLayer(LAYERS.FORECASTS))
    }

    function handleArchiveForecastRouteEnter({params: {name, date}}, replace) {
        date = moment(date, 'YYYY-MM-DD')

        if (date.isValid() && date.isBefore(new Date(), 'day')) {
            return
        }

        replace(`/forecasts/${name}`)
    }

    return (
        <Route path='/' component={Root} onEnter={handleRootRouteEntered} >
            {/*AVALANCHE CANADA*/}
            <IndexRedirect to='map' />
            <Route path='map' components={{content: Map, footer: null}}>
                <Route path='forecasts' onEnter={handleForecastRouteEnter} >
                    <Route path=':name' components={{primary: DRAWERS.Forecast}} />
                </Route>
                <Route path='hot-zone-reports' onEnter={handleHotZoneReportRouteEnter} >
                    <Route path=':name' components={{primary: DRAWERS.HotZoneReport}} />
                </Route>
            </Route>
            <Route path='mountain-information-network' component={MountainInformationNetwork} />
            <Route path='mountain-information-network/submit' component={MountainInformationNetworkSubmit} onEnter={requireAuth} />
            <Route path='mountain-information-network/faq' component={MountainInformationNetworkFAQ} />
            <Route path='mountain-information-network/submission-guidelines' component={MountainInformationNetworkSubmissionGuidelines} />
            <Route path='mountain-information-network/submissions/:id' component={MountainInformationNetwork} />
            <Route path='about' component={About} />
            <Route path='events' component={EventFeed} onEnter={handleFeedEnter} />
            <Route path='events/:uid' component={EventPost} />
            <Route path='news' component={NewsFeed} onEnter={handleFeedEnter} />
            <Route path='news/:uid' component={NewsPost} />
            <Route path='blogs' component={BlogFeed} onEnter={handleFeedEnter} />
            <Route path='blogs/:uid' component={BlogPost} />
            <Route path='forecasts/archives' component={Archives} />
            <Route path='forecasts/:name' component={Forecast} />
            <Route path='forecasts/:name/archives/:date' component={ArchiveForecast} onEnter={handleArchiveForecastRouteEnter} />
            <Redirect from='forecasts/:name/archives' to='forecasts/:name' />
            <Route path='weather' component={Weather}>
                <IndexRedirect to='forecast' />
                <Route path='forecast(/:date)' component={articles.Forecast} />
                <Route path='precipitation' component={articles.Precipitation} />
                <Route path='precipitation-12h' component={articles.Precipitation12h} />
                <Route path='temperatures' component={articles.Temperatures} />
                <Route path='winds' component={articles.Winds} />
                <Route path='surface-maps' component={articles.SurfaceMaps} />
                <Route path='radar' component={articles.Radar} />
                <Route path='satellite' component={articles.Satellite} />
                <Route path='warnings' component={articles.Warnings} />
            </Route>
            <Route path='sponsors' component={Sponsors} />
            <Route path='collaborators' component={Collaborators} />
            <Route path='ambassadors' component={Ambassadors} />
            <Route path='training'>
                <IndexRoute component={Training} />
                <Route component={Layouts.Ast}>
                    <Route path='providers' components={{table: ProvidersTable, form: ProvidersForm}} />
                    <Route path='courses' components={{table: CoursesTable, form: CoursesForm}} />
                </Route>
            </Route>
            <Route path='tutorial' component={Tutorial} />
            <Route path='youth' component={Youth} />
            <Route path='gear' component={Gear} />
            <Route path='sled' component={Sled} />
            <Route path='auction' component={Auction} />
            <Route path='terms-of-use' component={TermsOfUse} />
            <Route path='privacy-policy' component={PrivacyPolicy} />
            <Route path='trip-planner' component={TripPlanner} />
            <Route path='incidents' component={IncidentsTable} onEnter={handleIncidentsRouteEnter} />
            <Route path='incidents/:slug' component={IncidentDetails} />
            <Route path='pages/:type/:uid' component={PrismicPage} />
            {/* REDIRECTS */}
            <Redirect from='min' to='mountain-information-network' />
            <Redirect from='min/submit' to='mountain-information-network/submit' />
            <Redirect from='min/faq' to='mountain-information-network/faq' />
            <Redirect from='min/submission-guidelines' to='mountain-information-network/submission-guidelines' />
            <Redirect from='min/submissions/:id' to='mountain-information-network/submissions/:id' />
            {/* AUTHENTIFICATION */}
            <Route path='login' onEnter={::console.log} onLeave={::console.log} />
            <Route path='logout' onEnter={::console.log} onLeave={::console.log} />
            {/* AVALANCHE CANADA FOUNDATION */}
            <Route path='foundation' components={{navbar: AvalancheCanadaFoundation, content: About}}>
                {/* MORE FOUNDATION PAGES */}
            </Route>
            {/* FALLBACK */}
            <Route path='*' component={NotFound} />
        </Route>
    )
}
