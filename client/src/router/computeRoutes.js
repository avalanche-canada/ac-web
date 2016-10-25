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
import {FallbackPage} from 'prismic/components/page'
import {
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
    MountainInformationNetworkSubmission,
    Training,
    InstructingAst,
    Tutorial,
    Gear,
    Sled,
    Auction,
    Youth,
    TripPlanner,
    Incidents,
    Tutoriel,
    MembershipOverview,
    CherryBowlComingSoon,
} from 'containers'
import * as Feed from 'containers/feed'
import * as Foundation from 'containers/foundation'
import * as Funds from 'containers/funds'
import * as Layouts from 'layouts'
import {NotFound} from 'components/page'
import * as articles from 'components/page/weather/articles'
import {AvalancheCanadaFoundation} from 'containers/Navbar'
import * as LAYERS from 'constants/map/layers'
import ReactGA from 'services/analytics'
import postIdRedirects from './postIdRedirects'
import {getForecastRegionExternalUrl} from 'reducers/api/getters'

const YEAR = String(new Date().getFullYear())

export default function computeRoutes(store) {
    const {dispatch, getState} = store

    function handleActiveSponsor({routes, params, location}) {
        const {panel} = location.query
        const [route] = routes.filter(({sponsorRef}) => Boolean(sponsorRef)).reverse()

        if (route) {
            const {sponsorRef} = route

            if (sponsorRef === 'Forecast' && params.name === 'kananaskis') {
                dispatch(setActiveSponsor('kananaskis'))
            } else {
                dispatch(setActiveSponsor(sponsorRef))
            }
        } else {
            dispatch(resetActiveSponsor())
        }
    }

    function handleRootRouteChange(prev, next) {
        if (prev && prev.location.pathname !== next.location.pathname) {
            ReactGA.pageview(next.location.pathname)
            handleActiveSponsor(next)
        }
    }

    function handleRootRouteEnter(props) {
        ReactGA.pageview(props.location.pathname)
        dispatch(loadForType('sponsor', {
            pageSize: 100
        }))
        dispatch(loadSponsors())
        handleActiveSponsor(props)
    }

    function handleLoginCompleteRouteEnter({location}, replace) {
        const {id_token, state} = QueryString.parse(location.hash)

        if (id_token) {
            dispatch(receiveToken(id_token))
        }

        replace(state || '/')
    }

    function handleAboutRouteEnter() {
        loadStaffList()
    }

    function handleSledPageEnter() {
        loadStaffList()
    }

    function loadStaffList() {
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

    function handleEventFeedEnter({location}, replace) {
        const {query} = location

        if (typeof query.timeline === 'string') {
            return
        }

        query.timeline = 'upcoming'

        replace({...location, query})
    }

    function handleHotZoneReportRouteEnter() {
        dispatch(turnOnLayer(LAYERS.HOT_ZONE_REPORTS))
    }

    function handleMapForecastRouteEnter({params}) {
        dispatch(turnOnLayer(LAYERS.FORECASTS))
        handleExternalForecast(params.name)
    }

    function handleMapForecastRouteChange(prev, {params}) {
        handleExternalForecast(params.name)
    }

    function handlePageForecastRouteEnter({params}) {
        handleExternalForecast(params.name)
    }

    function handleExternalForecast(region) {
        const externalUrl = getForecastRegionExternalUrl(getState(), region)

        if (externalUrl) {
            window.open(externalUrl, '_blank')
        }
    }

    function handleArchiveForecastRouteEnter({params: {name, date}}, replace) {
        date = moment(date, 'YYYY-MM-DD')

        if (date.isValid() && date.isBefore(new Date(), 'day')) {
            return
        }

        replace(`/forecasts/${name}`)
    }

    function handleNotFoundRouteEnter({location}) {
        ReactGA.event({
            category: 'Navigation',
            action: 'Not Found',
            label: location.pathname,
            nonInteraction: true,
        })
    }

    return (
        <Route path='/' component={Layouts.Root} onEnter={handleRootRouteEnter} onChange={handleRootRouteChange} >
            {/* EMERGENCY REDIRECTS */}
            {postIdRedirects}
            {/* Common messed up redirects */}
            <Redirect from='cac/training/ast/courses' to='training/courses' />
            <Redirect from='cac/training/overview' to='training' />
            <Redirect from='cac/training/online-course' to='tutorial' />
            <Redirect from='cac' to='/' />
            {/* END EMERGENCY REDIRECTS */}

            {/* AUTHORIZATION */}
            <Route path='login-complete' onEnter={handleLoginCompleteRouteEnter} />
            {/* AVALANCHE CANADA */}
            <IndexRedirect to='map' />
            <Route path='map' sponsorRef='Forecast' components={{content: Layouts.Map, footer: null}}>
                <Route path='forecasts' onEnter={handleMapForecastRouteEnter} onChange={handleMapForecastRouteChange} >
                    <Route path=':name' components={{primary: Drawers.Forecast}} />
                </Route>
                <Route path='hot-zone-reports' onEnter={handleHotZoneReportRouteEnter} >
                    <Route path=':name' components={{primary: Drawers.HotZoneReport}} />
                </Route>
            </Route>
            <Route path='mountain-information-network' sponsorRef='MIN' component={MountainInformationNetwork} />
            <Route path='mountain-information-network/submit' sponsorRef='MIN' component={MountainInformationNetworkSubmit} onEnter={requireAuth} />
            <Redirect from='submit' to='mountain-information-network/submit' />
            <Route path='mountain-information-network/faq' sponsorRef='MIN' component={MountainInformationNetworkFAQ} />
            <Route path='mountain-information-network/submission-guidelines' sponsorRef='MIN' component={MountainInformationNetworkSubmissionGuidelines} />
            <Route path='mountain-information-network/submissions/:id' sponsorRef='MIN' component={MountainInformationNetworkSubmission} />
            <Route path='about' sponsorRef='About' component={About} onEnter={handleAboutRouteEnter} />
            <Route path='events' sponsorRef='EventIndex' component={Feed.EventFeed} onEnter={handleEventFeedEnter} />
            <Route path='events/:uid' sponsorRef='EventPage' component={Feed.EventPost} />
            <Route path='news' sponsorRef='NewsIndex' component={Feed.NewsFeed} onEnter={handleFeedEnter} />

            <Route path='news/:uid' sponsorRef='NewsPage' component={Feed.NewsPost} />

            <Route path='blogs' sponsorRef='BlogIndex' component={Feed.BlogFeed} onEnter={handleFeedEnter} />
            <Route path='blogs/:uid' sponsorRef='BlogPage' component={Feed.BlogPost} />
            {/* FORECAST */}
            <Route path='forecasts/archives' component={Archives} />
            <Route path='forecasts/:name' sponsorRef='Forecast' component={Forecast} onEnter={handlePageForecastRouteEnter} />
            <Redirect from='forecast/:name' to='forecasts/:name' />
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
                    <Route path='courses' sponsorRef='TrainingCourses' components={{table: CoursesTable, form: CoursesForm}} />
                </Route>
            </Route>
            <Route path='instructing-ast' sponsorRef='Training' component={InstructingAst} />
            <Route path='youth' sponsorRef='Youth' component={Youth} />
            <Route path='gear' sponsorRef='Gear' component={Gear} />
            <Route path='sled' component={Sled} onEnter={handleSledPageEnter} />
            <Route path='tutorial/*' component={Tutorial} />
            <Redirect from='tutorial' to='tutorial/' />
            <Route path='auction' component={{content: Auction, footer: null}} />
            <Route path='tutoriel' component={{content: Tutoriel, footer: null}} />
            <Route path='terms-of-use' component={TermsOfUse} />
            <Route path='privacy-policy' component={PrivacyPolicy} />
            <Route path='trip-planner' component={{content: TripPlanner, footer: null}} />
            <Route path='incidents' component={{content: Incidents, footer: null}} />
            <Route path='membership' component={MembershipOverview} />
            <Route path='cherry-bowl' component={CherryBowlComingSoon} />
            <Redirect from='cherrybowl' to='cherry-bowl' />
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
            <Route path='*' components={{content: NotFound, footer: null}} onEnter={handleNotFoundRouteEnter} />
        </Route>
    )
}
