import React from 'react'
import {Route, IndexRoute, IndexRedirect, Redirect} from 'react-router'
import moment from 'moment'
import {loadForType} from 'actions/prismic'
import {turnOnLayer} from 'actions/drawers'
import * as Drawers from 'containers/drawers';
import {getIsAuthenticated, getProfile} from 'reducers/auth'
import QueryString from 'query-string'
import {login, receiveToken} from 'actions/auth'
import {loadSponsors, setActiveSponsor, resetActiveSponsor} from 'actions/sponsors'
import {history} from 'router'
import AuthService from 'services/auth'
import CancelError from 'utils/promise/CancelError'
import {FallbackPage} from 'prismic/components/page'
import {
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
    HotZoneReport,
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
    TripPlanner,
    IncidentsTable,
    IncidentDetails,
    MembershipOverview,
} from 'containers'
import * as Feed from 'containers/feed'
import * as Foundation from 'containers/foundation'
import * as Funds from 'containers/funds'
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
    const {dispatch, getState} = store

    function handleActiveSponsor(routes) {
        const [route] = routes.filter(({sponsorRef}) => Boolean(sponsorRef)).reverse()

        if (route) {
            dispatch(setActiveSponsor(route.sponsorRef))
        } else {
            dispatch(resetActiveSponsor())
        }
    }

    function handleRootRouteChange(prev, {routes}) {
        handleActiveSponsor(routes)
    }

    function handleRootRouteEnter({routes}) {
        dispatch(loadForType('sponsor', {
            pageSize: 100
        }))
        dispatch(loadSponsors())
        handleActiveSponsor(routes)
    }

    function handleLoginCompleteRouteEnter({location}, replace) {
        const {id_token, state} = QueryString.parse(location.hash)

        if (id_token) {
            dispatch(receiveToken(id_token))
        }

        replace(state || '/')
    }

    function handleAboutRouteEnter() {
        dispatch(loadForType('staff', {
            pageSize: 100
        }))
    }

    function requireAuth({location}, replace, callback) {
        const state = getState()

        if (getIsAuthenticated(state)) {
            callback()
        } else {
            const auth = AuthService.create()

            auth.login().catch(error => {
                replace('/')
                callback()
            })
        }
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
        enforcePagination(props, replace)
    }

    function enforcePagination({location}, replace) {
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
        <Route path='/' component={Layouts.Root} onEnter={handleRootRouteEnter} onChange={handleRootRouteChange} >
            {/* AUTHORIZATION */}
            <Route path='login-complete' onEnter={handleLoginCompleteRouteEnter} />
            {/* AVALANCHE CANADA */}
            <IndexRedirect to='map' />
            <Route path='map' sponsorRef='Forecast' components={{content: Map, footer: null}}>
                <Route path='forecasts' onEnter={handleForecastRouteEnter} >
                    <Route path=':name' components={{primary: Drawers.Forecast}} />
                </Route>
                <Route path='hot-zone-reports' onEnter={handleHotZoneReportRouteEnter} >
                    <Route path=':name' components={{primary: Drawers.HotZoneReport}} />
                </Route>
            </Route>
            <Route path='mountain-information-network' sponsorRef='MIN' component={MountainInformationNetwork} />
            <Route path='mountain-information-network/submit' component={MountainInformationNetworkSubmit} />
            <Route path='mountain-information-network/faq' component={MountainInformationNetworkFAQ} />
            <Route path='mountain-information-network/submission-guidelines' component={MountainInformationNetworkSubmissionGuidelines} />
            <Route path='mountain-information-network/submissions/:id' component={MountainInformationNetwork} />
            <Route path='about' sponsorRef='About' component={About} onEnter={handleAboutRouteEnter} />
            <Route path='events' sponsorRef='EventIndex' component={Feed.EventFeed} onEnter={handleFeedEnter} />
            <Route path='events/:uid' sponsorRef='EventPage' component={Feed.EventPost} />
            <Route path='news' sponsorRef='NewsIndex' component={Feed.NewsFeed} onEnter={handleFeedEnter} />
            <Route path='news/:uid' sponsorRef='NewsPage' component={Feed.NewsPost} />
            <Route path='blogs' sponsorRef='BlogIndex' component={Feed.BlogFeed} onEnter={handleFeedEnter} />
            <Route path='blogs/:uid' sponsorRef='BlogPage' component={Feed.BlogPost} />
            {/* FORECAST */}
            <Route path='forecasts/archives' component={Archives} />
            <Route path='forecasts/:name' sponsorRef='Forecast' component={Forecast} />
            <Route path='forecasts/:name/archives/:date' component={ArchiveForecast} onEnter={handleArchiveForecastRouteEnter} />
            <Redirect from='forecasts/:name/archives' to='forecasts/:name' />
            {/* HOT ZONE REPORT */}
            <Route path='hot-zone-reports/:name' sponsorRef='Forecast' component={HotZoneReport} />
            {/* WEATHER */}
            <Route path='weather' type='weather-forecast' sponsorRef='Weather' component={Weather}>
                <IndexRedirect to='forecast' />
                <Route path='forecast(/:date)' component={articles.Forecast} />
            </Route>
            <Route path='new/weather' sponsorRef='Weather' component={Weather}>
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
            <Route path='training' sponsorRef='Training' >
                <IndexRoute component={Training} />
                <Route component={Layouts.Ast}>
                    <Route path='providers' components={{table: ProvidersTable, form: ProvidersForm}} />
                    <Route path='courses' components={{table: CoursesTable, form: CoursesForm}} />
                </Route>
            </Route>
            <Route path='youth' sponsorRef='Youth' component={Youth} />
            <Route path='gear' sponsorRef='Gear' component={Gear} />
            <Route path='sled' component={Sled} />
            <Route path='tutorial/*' component={Tutorial} />
            <Redirect from="tutorial" to="tutorial/" />
            <Route path='auction' component={Auction} />
            <Route path='terms-of-use' component={TermsOfUse} />
            <Route path='privacy-policy' component={PrivacyPolicy} />
            <Route path='trip-planner' component={TripPlanner} />
            <Route path='incidents' component={IncidentsTable} onEnter={handleIncidentsRouteEnter} />
            <Route path='incidents/:slug' component={IncidentDetails} />
            <Route path='membership' component={MembershipOverview} />
            {/* REDIRECTS */}
            <Redirect from='min' to='mountain-information-network' />
            <Redirect from='min/submit' to='mountain-information-network/submit' />
            <Redirect from='min/faq' to='mountain-information-network/faq' />
            <Redirect from='min/submission-guidelines' to='mountain-information-network/submission-guidelines' />
            <Redirect from='min/submissions/:id' to='mountain-information-network/submissions/:id' />
            {/* AVALANCHE CANADA FOUNDATION */}
            <Route path='foundation'>
                <IndexRoute components={{navbar: AvalancheCanadaFoundation, content: Foundation.Home, footer: null}} />
                <Route path='about' components={{navbar: AvalancheCanadaFoundation, content: Foundation.About}} onEnter={handleAboutRouteEnter} />
                <Route path='programs' components={{navbar: AvalancheCanadaFoundation, content: Foundation.Programs}} />
                <Route path='donors' components={{navbar: AvalancheCanadaFoundation, content: Foundation.Donors}} />
                <Route path='event-sponsors' components={{navbar: AvalancheCanadaFoundation, content: Foundation.EventSponsors}} />
                <Route path='news-and-events' components={{navbar: AvalancheCanadaFoundation, content: Foundation.NewsAndEvents}} />
                <Route path='funds'>
                    <Route path='hugh-and-helen-hincks-memorial' components={{navbar: AvalancheCanadaFoundation, content: Funds.HughAndHelenHincksMemorial}} />
                    <Route path='craig-kelly-memorial-scholarship' components={{navbar: AvalancheCanadaFoundation, content: Funds.CraigKellyScholarshipMemorial}} />
                    <Route path='cora-shea-memorial' components={{navbar: AvalancheCanadaFoundation, content: Funds.CoraSheaMemorial}} />
                    <Route path='al-hodgson-memorial' components={{navbar: AvalancheCanadaFoundation, content: Funds.AlHodgsonMemorial}} />
                    <Route path='issw' components={{navbar: AvalancheCanadaFoundation, content: Funds.ISSW}} />
                </Route>
            </Route>
            {/* PAGE FALLBACK. MORE DETAILS at client/src/prismic/htmlSerializer.js and some redirects */}
            <Redirect from='/pages/static-page/sled' to='/sled' />
            <Redirect from='/pages/static-page/youth' to='/youth' />
            <Redirect from='/pages/static-page/essential-gear' to='/gear' />
            <Redirect from='/pages/static-page/training' to='/training' />
            <Redirect from='/pages/static-page/mountain-information-network-overview' to='/mountain-information-network' />
            <Redirect from='/pages/static-page/mountain-information-network-submission-guidelines' to='/mountain-information-network/submission-guidelines' />
            <Redirect from='/pages/static-page/about' to='/about' />
            <Redirect from='/pages/static-page/mountain-information-network-faq' to='/mountain-information-network/faq' />
            <Redirect from='/pages/static-page/ambassadors' to='/ambassadors' />
            <Redirect from='/pages/static-page/sponsors' to='/sponsors' />
            <Redirect from='/pages/static-page/collaborators' to='/collaborators' />
            <Redirect from='/pages/static-page/membership-overview' to='/membership' />

            <Redirect from='generic/privacy-policy' to='privacy-policy' />
            <Redirect from='generic/terms-of-use' to='terms-of-use' />
            <Redirect from='generic/auction' to='auction' />

            <Route path='pages/:type/:uid' component={FallbackPage} />
            {/* FALLBACK */}
            <Route path='*' component={NotFound} />
        </Route>
    )
}
