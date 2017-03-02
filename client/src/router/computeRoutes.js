import React from 'react'
import {Route, IndexRoute, IndexRedirect, Redirect} from 'react-router'
import parse from 'date-fns/parse'
import isBefore from 'date-fns/is_before'
import startOfDay from 'date-fns/start_of_day'
import {load} from 'actions/prismic'
import {turnOnLayer} from 'actions/drawers'
import * as MapActions from 'actions/map'
import * as Drawers from 'containers/drawers'
import {getIsAuthenticated} from 'getters/auth'
import QueryString from 'query-string'
import {login, receiveToken} from 'actions/auth'
import {loadSponsors, setActiveSponsor, resetActiveSponsor} from 'actions/sponsors'
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
    PrivacyPolicy,
    TermsOfUse,
    Forecast,
    Forecasts,
    ArchiveForecast,
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
    FAQ,
    Information,
    Planning,
    Auction,
    Youth,
    TripPlanner,
    Incidents,
    Tutoriel,
    MembershipOverview,
    CherryBowl,
    Tech,
    WeatherStation,
    EarlySeasonConditions,
} from 'containers'
import {Forecast as WeatherForecast} from 'containers/Weather'
import * as Feed from 'containers/feed'
import * as Foundation from 'containers/foundation'
import * as Funds from 'containers/funds'
import * as Layouts from 'layouts'
import * as table from 'layouts/min/table'
import {NotFound} from 'components/page'
import * as articles from 'components/page/weather/articles'
import {AvalancheCanadaFoundation} from 'containers/Navbar'
import ReactGA from 'services/analytics'
import postRedirects from './postRedirects'
import {getForecastRegionExternalUrl} from 'getters/api'
import * as Schemas from 'api/schemas'

export default function computeRoutes(store) {
    const {dispatch, getState} = store
    let external = null

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
        dispatch(load({
            type: 'sponsor',
            options: {
                pageSize: 100
            }
        }))
        dispatch(loadSponsors())
        handleActiveSponsor(props)
    }

    function handleLoginCompleteRouteEnter({location}, replace) {
        const {id_token, access_token, state} = QueryString.parse(location.hash)

        if (id_token && access_token) {
            dispatch(receiveToken(id_token, access_token))
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
        dispatch(load({
            type: 'staff',
            options: {
                pageSize: 100
            }
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

    function handleEventFeedEnter({location}, replace) {
        const {query} = location

        if (typeof query.timeline === 'string') {
            return
        }

        query.timeline = 'upcoming'

        replace({...location, query})
    }

    function handleMapForecastRouteEnter({params}) {
        handleExternalForecast(params.name)
    }

    function handleMapForecastRouteChange(prev, {params: {name}}) {
        if (name !== prev.params.name) {
            handleExternalForecast(name)
        }
    }

    function handlePageForecastRouteEnter({params: {name}}, replace) {
        if (handleExternalForecast(name)) {
            replace(`/map/forecasts/${name}`)
        }
    }

    function handleExternalForecast(region) {
        const url = getForecastRegionExternalUrl(getState(), region)

        if (url) {
            if (!external || external.closed) {
                external = window.open(url, '_blank')
            } else {
                external.location.replace(url)
                external.focus()
            }

            return true
        } else {
            return false
        }
    }

    function handleArchiveForecastRouteEnter({params: {name, date}}, replace) {
        if (!date || isBefore(parse(date, 'YYYY-MM-DD'), startOfDay(new Date()))) {
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

    function redirect({location}, replace, callback) {
        // Need callback, it is not working if not specified
        // See react-router documentation for more details
        // Leave the application and goes to nginx to do appropriate redirect
        document.location = location.pathname
    }

    const RouteSchemaMapping = new Map([
        [Schemas.Forecast.key, Schemas.ForecastRegion.key],
        [Schemas.HotZoneReport.key, Schemas.HotZone.key],
    ])

    function createActiveFeatures({routes, params, location}) {
        const features = []
        const {panel} = location.query
        const {name} = params

        if (panel) {
            features.push(panel.split('/'))
        }

        if (name) {
            Array.from(RouteSchemaMapping).forEach(([from, to]) => {
                if (routes.find(route => route.path === from)) {
                    features.push([to, name])
                }
            })
        }

        return new Map(features)
    }

    function onMapRouteEnter(next) {
        dispatch(MapActions.activeFeaturesChanged(createActiveFeatures(next)))
    }

    function onMapRouteChange(previous, next) {
        dispatch(MapActions.activeFeaturesChanged(createActiveFeatures(next)))
    }

    return (
        <Route path='/' component={Layouts.Root} onEnter={handleRootRouteEnter} onChange={handleRootRouteChange} >
            {/* EMERGENCY REDIRECTS */}
            {postRedirects.map((redirect, index) =>
                <Redirect key={index} {...redirect} />
            )}

            {/* AUTHORIZATION */}
            <Route path='login-complete' onEnter={handleLoginCompleteRouteEnter} />
            {/* AVALANCHE CANADA */}
            <IndexRedirect to='map' />
            <Route path='map' sponsorRef='Forecast' components={{content: Layouts.Map, footer: null}} onEnter={onMapRouteEnter} onChange={onMapRouteChange}>
                <Route path='forecasts' onEnter={handleMapForecastRouteEnter} onChange={handleMapForecastRouteChange} >
                    <Route path=':name' components={{primary: Drawers.Forecast}} />
                </Route>
                <Route path='hot-zone-reports'>
                    <Route path=':name' components={{primary: Drawers.HotZoneReport}} />
                </Route>
            </Route>
            <Route path='mountain-information-network' sponsorRef='MIN' component={MountainInformationNetwork} />
            <Route path='mountain-information-network/submit' sponsorRef='MIN' component={MountainInformationNetworkSubmit} onEnter={requireAuth} />
            <Redirect from='submit' to='mountain-information-network/submit' />
            <Route path='mountain-information-network/faq' sponsorRef='MIN' component={MountainInformationNetworkFAQ} />
            <Route path='mountain-information-network/submission-guidelines' sponsorRef='MIN' component={MountainInformationNetworkSubmissionGuidelines} />
            <Route path='mountain-information-network/submissions/:id' sponsorRef='MIN' component={MountainInformationNetworkSubmission} />
            <Route path='mountain-information-network/submissions' sponsorRef='MIN' component={table.Page} />
            <Route path='about' sponsorRef='About' component={About} onEnter={handleAboutRouteEnter} />
            <Route path='events' sponsorRef='EventIndex' component={Layouts.EventFeed} onEnter={handleEventFeedEnter} />
            <Route path='events/:uid' sponsorRef='EventPage' component={Feed.EventPost} />
            <Route path='news' sponsorRef='NewsIndex' component={Layouts.NewsFeed} />
            <Route path='news/:uid' sponsorRef='NewsPage' component={Feed.NewsPost} />
            <Route path='blogs' sponsorRef='BlogIndex' component={Layouts.BlogFeed} />
            <Route path='blogs/:uid' sponsorRef='BlogPage' component={Feed.BlogPost} />
            {/* FORECAST */}
            <Route path='forecasts(/:name)/archives(/:date)' component={ArchiveForecast} onEnter={handleArchiveForecastRouteEnter} />
            <Route path='forecasts' sponsorRef='Forecast' components={{content: Forecasts, footer: null}} />
            <Route path='forecasts/:name(/:date)' sponsorRef='Forecast' component={Forecast} onEnter={handlePageForecastRouteEnter} />
            <Redirect from='forecast/:name' to='forecasts/:name' />
            <Route path='forecasts/:name/archives/:date' component={ArchiveForecast}  />
            {/* HOT ZONE REPORT */}
            <Route path='hot-zone-reports/:name(/:uid)' sponsorRef='Forecast' component={HotZoneReport} />
            {/* WEATHER */}
            <Route path='weather/stations/:id' component={WeatherStation} />
            <Route path='weather' sponsorRef='Weather' component={Layouts.Weather}>
                <IndexRedirect to='forecast' />
                <Route path='forecast(/:date)' component={WeatherForecast} />
                <Route path='hourly-precipitation' component={articles.HourlyPrecipitation} />
                <Route path='12h-precipitation' component={articles.Precipitation12h} />
                <Route path='temperatures' component={articles.Temperatures} />
                <Route path='winds' component={articles.Winds} />
                <Route path='surface-maps' component={articles.SurfaceMaps} />
                <Route path='other-maps' component={articles.OtherMaps} />
                <Route path='radar' component={articles.Radar} />
                <Route path='satellite' component={articles.Satellite} />
                <Route path='actual-temperatures' component={articles.ActualTemperatures} />
                <Route path='warnings' component={articles.Warnings} />
            </Route>
            <Route path='sponsors' component={Sponsors} />
            <Route path='collaborators' component={Collaborators} />
            <Route path='ambassadors' component={Ambassadors} />
            <Redirect from='learn' to='training' />
            <Route path='training' sponsorRef='Training' >
                <IndexRoute component={Training} />
                <Route component={Layouts.Ast}>
                    <Route path='providers' components={{table: ProvidersTable, form: ProvidersForm}} />
                    <Route path='courses' sponsorRef='TrainingCourses' components={{table: CoursesTable, form: CoursesForm}} />
                </Route>
            </Route>
            <Route path='faq' component={FAQ} />
            <Route path='planning' component={Planning} />
            <Route path='information' component={Information} />
            <Route path='tech' component={Tech} />
            <Route path='early-season-conditions' component={EarlySeasonConditions} />
            <Route path='instructing-ast' sponsorRef='Training' component={InstructingAst} />
            <Route path='youth' sponsorRef='Youth' component={Youth} />
            <Route path='gear' sponsorRef='Gear' component={Gear} />
            <Route path='sled' component={Sled} onEnter={handleSledPageEnter} />
            <Route path='tutorial/*' component={Tutorial} />
            <Redirect from='tutorial' to='tutorial/' />
            <Route path='auction' components={{content: Auction, footer: null}} />
            <Route path='tutoriel' components={{content: Tutoriel, footer: null}} />
            <Route path='terms-of-use' component={TermsOfUse} />
            <Route path='privacy-policy' component={PrivacyPolicy} />
            <Route path='trip-planner' components={{content: TripPlanner, footer: null}} />
            <Route path='incidents' components={{content: Incidents, footer: null}} />
            <Route path='membership' component={MembershipOverview} />
            {/* Cherry Bowl */}
            <Route path='cherry-bowl' component={CherryBowl} onEnter={redirect} />
            <Redirect from='cherrybowl' to='cherry-bowl' />
            {/* REDIRECTS */}
            <Redirect from='min' to='mountain-information-network' />
            <Redirect from='min/submit' to='mountain-information-network/submit' />
            <Redirect from='min/faq' to='mountain-information-network/faq' />
            <Redirect from='min/submission-guidelines' to='mountain-information-network/submission-guidelines' />
            <Redirect from='min/submissions/:id' to='mountain-information-network/submissions/:id' />
            <Redirect from='min/submissions' to='mountain-information-network/submissions' />
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
                <Route path='donate' components={{navbar: AvalancheCanadaFoundation, content: Foundation.Donate}} />
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

            {/* fxresources has to go to nginx */}
            <Route path='fxresources/*' onEnter={redirect} />

            <Route path='pages/:type/:uid' component={FallbackPage} />
            {/* FALLBACK */}
            <Route path='*' components={{content: NotFound, footer: null}} onEnter={handleNotFoundRouteEnter} />
        </Route>
    )
}
