import React, { Component, Fragment } from 'react'
import Application from 'components/application'
import Alert from 'components/highlight'
import { Route, Redirect, Switch } from 'react-router-dom'
import Bundle from 'components/Bundle'
import { NotFoundRoute, StaticPageRoute, GenericPageRoute } from 'router/common'
import LoginComplete from './LoginComplete'
import Login from './Login'
import Navbar from './Navbar'
import SPAW from './SPAW'
import Highlight from './Highlight'
import Footer from 'components/footer'
import Main from 'layouts/main'
import loadTutorial from 'bundle-loader?lazy!./tutorial'
import Ast from './Ast'
import mountainInformationNetwork from './MountainInformationNetwork'
import Weather from './weather'
import HotZoneReport from './HotZoneReport'
import { IncidentsList, IncidentDetails } from './Incidents'
import HotZoneList from './HotZoneList'
import Forecast from './Forecast'
import TripPlanner from './TripPlanner'
import * as Feed from './feed'
import Glossary from 'layouts/Glossary'
import ErrorBoundary from 'components/ErrorBoundary'
import { Error, Loading } from 'components/text'
import * as Page from 'components/page'
import { ButtonSet } from 'components/button'
import styles from 'components/page/Page.css'
import { captureException } from 'services/raven'
import { Provider as SponsorsMetadataProvider } from 'contexts/sponsors'
import * as prismic from 'prismic/layouts'
import { GENERIC, STATIC_PAGE } from 'constants/prismic'

export default class AvalancheCanada extends Component {
    capture(error, { extra }) {
        // https://blog.sentry.io/2017/09/28/react-16-error-boundaries
        captureException(error, { extra })
    }
    renderError({ error }) {
        return (
            <Page.Error>
                <Page.Main>
                    <h1>Uh oh! We never thought that would happen...</h1>
                    <Page.Headline>
                        An error happened on a page you tried to visit.
                        <Error>{error.message}</Error>
                    </Page.Headline>
                    <ButtonSet>
                        <a href="/" className={styles.Link}>
                            Forecasts
                        </a>
                        <a href="/training" className={styles.Link}>
                            Training
                        </a>
                        <a href="/news" className={styles.Link}>
                            Latest news
                        </a>
                        <a href="/events" className={styles.Link}>
                            Upcoming events
                        </a>
                        <a href="/blogs" className={styles.Link}>
                            Our blog
                        </a>
                    </ButtonSet>
                </Page.Main>
            </Page.Error>
        )
    }
    render() {
        return (
            <SponsorsMetadataProvider>
                <Application>
                    <Navbar />
                    <SPAW />
                    <Highlight />
                    <ErrorBoundary
                        onError={this.capture}
                        fallback={this.renderError}>
                        <Switch>
                            <Redirect exact from="/" to="/map" />
                            <Redirect
                                from="/map/ates"
                                to="/planning/trip-planner"
                            />
                            <Redirect
                                from="/trip-planner"
                                to="/planning/trip-planner"
                            />
                            <Redirect
                                from="/trip-planning/:page"
                                to="/planning/:page"
                            />
                            <Redirect from="/trip-planning" to="/planning" />
                            <Redirect
                                from="/forecast/:name"
                                to="/forecasts/:name"
                            />
                            <Redirect from="/learn" to="/training" />
                            <Route
                                path="/login-complete"
                                component={LoginComplete}
                            />
                            <Route path="/login" component={Login} />
                            <Route path="/map/:type?/:name?" component={Main} />
                            <Route path="/glossary" component={Glossary} />
                            <Redirect
                                strict
                                exact
                                from="/tutorial/"
                                to="/tutorial"
                            />
                            <Route path="/tutorial" render={tutorial} />
                            <Route path="/tutoriel" render={tutoriel} />
                            <Route
                                path="/hot-zone-reports"
                                component={HotZoneReport}
                            />
                            <Route path="/hot-zones" component={HotZoneList} />
                            <Route path="/forecasts" component={Forecast} />
                            <Route path="/blogs" render={blogs} />
                            <Route path="/news" render={news} />
                            <Route path="/events" render={events} />
                            <Route path="/incidents" render={incidents} />
                            <Route path="/min" render={min} />
                            <Route
                                path="/mountain-information-network"
                                render={mountainInformationNetwork}
                            />
                            <Route path="/weather" component={Weather} />
                            <Route path="/training/:type" component={Ast} />
                            <StaticPageRoute
                                path="/about"
                                uid="about"
                                title="About"
                            />
                            <StaticPageRoute
                                path="/early-season-conditions"
                                uid="early-season-conditions"
                                title="Early Season Conditions"
                            />
                            <StaticPageRoute
                                path="/faq"
                                uid="faq"
                                title="FAQ"
                            />
                            <Route
                                path="/planning/trip-planner"
                                component={TripPlanner}
                            />
                            <StaticPageRoute
                                path="/planning/decision-making"
                                uid="decision-making"
                                title="Decision Making"
                            />
                            <StaticPageRoute
                                path="/planning"
                                uid="planning"
                                title="Planning"
                            />
                            <StaticPageRoute
                                path="/information"
                                uid="information"
                                title="Information"
                            />
                            <StaticPageRoute
                                path="/sled"
                                uid="sled"
                                title="Sled"
                            />
                            <StaticPageRoute
                                path="/youth"
                                uid="youth"
                                title="Youth"
                            />
                            <StaticPageRoute
                                path="/gear"
                                uid="essential-gear"
                                title="Essential Gear"
                            />
                            <StaticPageRoute
                                path="/training"
                                uid="training"
                                title="Go Farther — Get Avalanche Trained"
                            />
                            <StaticPageRoute
                                path="/education"
                                uid="education"
                                title="Go Farther — Get Avalanche Trained"
                            />
                            <StaticPageRoute
                                path="/instructing-ast"
                                uid="instructing-ast"
                                title="Teaching Avalanche Skills Training (AST)"
                            />
                            <StaticPageRoute
                                path="/ambassadors"
                                uid="ambassadors"
                                title="Ambassadors"
                            />
                            <StaticPageRoute
                                path="/sponsors"
                                uid="sponsors"
                                title="Sponsors"
                            />
                            <StaticPageRoute
                                path="/collaborators"
                                uid="collaborators"
                                title="Collaborators"
                            />
                            <StaticPageRoute
                                path="/membership"
                                uid="membership-overview"
                                title="Membership Overview"
                            />
                            <GenericPageRoute
                                path="/privacy-policy"
                                uid="privacy-policy"
                                title="Privacy Policy"
                            />
                            <GenericPageRoute
                                path="/terms-of-use"
                                uid="terms-of-use"
                                title="Terms of use"
                            />
                            <Route path="/pages" render={pages} />
                            <NotFoundRoute />
                        </Switch>
                    </ErrorBoundary>
                    <Switch>
                        <Route path="/map" component={null} />
                        <Route path="/planning/trip-planner" component={null} />
                        <Route component={Footer} />
                    </Switch>
                </Application>
            </SponsorsMetadataProvider>
        )
    }
}

// Subroutes
// Create renderers to split concerns and reduce to initial rendering
function blogs({ match }) {
    const { path } = match

    return (
        <Switch>
            <Route path={`${path}/:uid`} component={Feed.BlogPost} />
            <Route path={path} component={Feed.BlogPostFeed} />
        </Switch>
    )
}
function news({ match }) {
    const { path } = match

    return (
        <Switch>
            <Redirect
                from={`${path}/V-r0EyYAACcAbkKw`}
                to={`${path}/register-now`}
            />
            <Redirect
                from={`${path}/V8hpNyQAABuEOE6V`}
                to={`${path}/avalanche-canada-has-brand-new-youth-tool-boxes-available`}
            />
            <Redirect
                from={`${path}/V9Br8SYAACcAzxmI`}
                to={`${path}/calgary-foundation-grant-award`}
            />
            <Redirect
                from={`${path}/Vow8-R8AAFDJUq1b`}
                to={`${path}/transceiver-interference`}
            />
            <Redirect
                from={`${path}/VEV1hyYAAKwITagl`}
                to={`${path}/annual-report-2014`}
            />
            <Redirect
                from={`${path}/VIDCKCsAACcAgEpK`}
                to={`${path}/donation-request-avalanche-canada`}
            />
            <Redirect
                from={`${path}/VL63mCUAACYAOeVo`}
                to={`${path}/canuck-splitfest-fundraiser-success-2015`}
            />
            <Redirect
                from={`${path}/VL7ZgiUAACMAOilw`}
                to={`${path}/thunderstruck-fundraiser-donation-2015`}
            />
            <Redirect
                from={`${path}/VNASWCUAAJQpqGrY`}
                to={`${path}/deep-winter-photo-challenge-fundraiser-2015`}
            />
            <Redirect
                from={`${path}/VT_rPiYAACUAbasG`}
                to={`${path}/mountain-weather-forecast-summer`}
            />
            <Redirect
                from={`${path}/VftedR8AAIYAI8QW`}
                to={`${path}/acc-new-hut`}
            />
            <Redirect
                from={`${path}/ViGKDCEAAEwWNpIz`}
                to={`${path}/agm-2015`}
            />
            <Redirect
                from={`${path}/VHZlwSgAACYAw466`}
                to={`${path}/boundary-changes-south-rockies`}
            />
            <Redirect
                from={`${path}/VH-XbykAACwAQbtc`}
                to={`${path}/arcteryx-deep-winter-photo-challenge-2014`}
            />
            <Redirect
                from={`${path}/VJIKXCcAACYAFiD-`}
                to={`${path}/avalanche-awareness-days-2015`}
            />
            <Redirect
                from={`${path}/VLbN0CMAALqmQ9tp`}
                to={`${path}/introduction-mountain-information-network`}
            />
            <Redirect
                from={`${path}/VRmZzR8AAOIMXMnP`}
                to={`${path}/agm-october-announcement`}
            />
            <Redirect
                from={`${path}/VZ7psx0AAB0AuUBl`}
                to={`${path}/recall-bd-jetforce-airbag`}
            />
            <Redirect
                from={`${path}/ViauYB0AAHAHUPr_`}
                to={`${path}/new-support-craig-kelly-fund`}
            />
            <Redirect
                from={`${path}/ViayAx0AAB4AURDZ`}
                to={`${path}/cora-shea-memorial-awards`}
            />
            <Redirect
                from={`${path}/VkDizCEAAJsBkh2d`}
                to={`${path}/bca-backcountry-basics-videos`}
            />
            <Redirect
                from={`${path}/VDbtkScAAKUBPZm5`}
                to={`${path}/introducing-avalanche-canada`}
            />
            <Redirect
                from={`${path}/VH5GLSMAACcAc0vA`}
                to={`${path}/snorider-brent-strand-announcement`}
            />
            <Redirect
                from={`${path}/VIockywAACsA-wP3`}
                to={`${path}/forecasts-inbox-rss`}
            />
            <Redirect
                from={`${path}/VL6NXiUAACYAOZA3`}
                to={`${path}/announcement-new-mountain-weather-forecast`}
            />
            <Redirect
                from={`${path}/VP9AZR4AACQAlToR`}
                to={`${path}/land-thundering-snow-launch`}
            />
            <Redirect
                from={`${path}/VRrR-x8AAKBCX0JI`}
                to={`${path}/recall-ortovox-s1`}
            />
            <Redirect
                from={`${path}/VQh-RikAACgA6K4B`}
                to={`${path}/calgary-fundraiser-success-2015`}
            />
            <Redirect
                from={`${path}/VdNwyB8AAE4Ln13g`}
                to={`${path}/al-hodgson-memorial-fund`}
            />
            <Redirect
                from={`${path}/VEbXGiYAACsAaNZV`}
                to={`${path}/five-snowmobile-safety-messages`}
            />
            <Redirect
                from={`${path}/VEbHaSYAACsAaLc_`}
                to={`${path}/tedx-talk-risk`}
            />
            <Redirect
                from={`${path}/VH-KSykAACkAQaCR`}
                to={`${path}/baw-success-2014`}
            />
            <Redirect
                from={`${path}/VIivUisAACYAY0tp`}
                to={`${path}/avalanche-canada-widget-update`}
            />
            <Redirect
                from={`${path}/VIoEBSwAACsA-tKL`}
                to={`${path}/dramatic-rescue-clemina-creek`}
            />
            <Redirect
                from={`${path}/VEVy9CYAACQATaL-`}
                to={`${path}/justin-trudeau-message`}
            />
            <Redirect
                from={`${path}/VVtiryYAAOwJxyOO`}
                to={`${path}/recall-msr-snow-shovels`}
            />
            <Redirect
                from={`${path}/VMgrmyUAAJQpmL6o`}
                to={`${path}/min-how-to-videos`}
            />
            <Redirect
                from={`${path}/VjkZEB0AAB0AV7J4`}
                to={`${path}/annual-report-2015`}
            />
            <Redirect
                from={`${path}/VkogLh8AAB0AI-ag`}
                to={`${path}/free-ast-youth-course-fernie`}
            />
            <Redirect
                from={`${path}/Vk4VIh4AAG8G0bZg`}
                to={`${path}/new-sponsor-g3`}
            />
            <Redirect
                from={`${path}/VlN8siIAAFANmCkM`}
                to={`${path}/new-release-throttle-decisions`}
            />
            <Redirect
                from={`${path}/VlYciR0AADgEB1Sp`}
                to={`${path}/cross-border-collaboration-training`}
            />
            <Redirect
                from={`${path}/VpPu3h8AAKAFGUI2`}
                to={`${path}/avalanche-awareness-days-primer`}
            />
            <Redirect
                from={`${path}/VrOc4CsAACwA4KjU`}
                to={`${path}/pr-bc-coroner-avalanche-feb3`}
            />
            <Redirect
                from={`${path}/VrjoXiYAAEwCjmRs`}
                to={`${path}/avalanche-ambassador-aad-revelstoke`}
            />
            <Redirect
                from={`${path}/VN0YqSYAACoAJakp`}
                to={`${path}/membership-drive`}
            />
            <Redirect
                from={`${path}/Vst0dyMAADoSu4_N`}
                to={`${path}/al-hodgson-memorial-award`}
            />
            <Redirect
                from={`${path}/Vplv7SMAAFQcaHWb`}
                to={`${path}/sfu-new-research-chair`}
            />
            <Redirect
                from={`${path}/VpV_lx8AAMUSIpac`}
                to={`${path}/min-update`}
            />
            <Redirect
                from={`${path}/VuxMXiwAALFL7Yyb`}
                to={`${path}/foundation-calgary-benefit-2016`}
            />
            <Redirect
                from={`${path}/VjukhiMAACQA2fJX`}
                to={`${path}/new-office-space`}
            />
            <Redirect
                from={`${path}/VnHASR8AAIoSs8eR`}
                to={`${path}/thunderstruck-rsc-fundraiser`}
            />
            <Redirect
                from={`${path}/Vw6XMCkAAD9f09uB`}
                to={`${path}/craig-kelly-scholarship-awarded`}
            />
            <Redirect
                from={`${path}/Vx-6kSkAAEG1OTEL`}
                to={`${path}/hot-zone-reports`}
            />
            <Redirect
                from={`${path}/Vk0CliEAAKIFhX3l`}
                to={`${path}/2015-service-award`}
            />
            <Redirect
                from={`${path}/Vh1iVx4AALsES5Zw`}
                to={`${path}/avalanche-ambassador-program-announcement`}
            />
            <Redirect
                from={`${path}/VyeeSiYAAASDd20a`}
                to={`${path}/land-of-thundering-snow`}
            />
            <Redirect
                from={`${path}/VpP3lB8AAKAFGXVS`}
                to={`${path}/canuck-splitfest-2016`}
            />
            <Redirect
                from={`${path}/VK7R4iMAACMAM93b`}
                to={`${path}/snowmobile-loaners-2016`}
            />
            <Redirect
                from={`${path}/VuhTEiwAAMEK1gWI`}
                to={`${path}/adjunct-professor-announcement`}
            />
            <Redirect
                from={`${path}/Vw_rICkAALuO27JE`}
                to={`${path}/royal-canadian-pacific-fundraiser`}
            />
            <Route path={`${path}/:uid`} component={Feed.NewsPost} />
            <Route path={path} component={Feed.NewsFeed} />
        </Switch>
    )
}
function events({ match }) {
    const { path } = match

    return (
        <Switch>
            <Redirect
                from={`${path}/VvLeBSUAAJgDAgX6`}
                to={`${path}/asa-snowmobile-show-2016`}
            />
            <Redirect
                from={`${path}/V-r2XyYAACcAblCX`}
                to={`${path}/spin-safety-fundraiser`}
            />
            <Redirect
                from={`${path}/VEFS_yYAACYARWyK`}
                to={`${path}/thunderstuck-fundraiser-2016`}
            />
            <Redirect
                from={`${path}/V9bxeiYAACgA9jex`}
                to={`${path}/cardel-homes-movie-ruin-rose`}
            />
            <Redirect
                from={`${path}/V9By4yYAACgAz0Ni`}
                to={`${path}/agm-save-the-date-2016`}
            />
            <Redirect
                from={`${path}/V7Sy6ycAACUAo4u_`}
                to={`${path}/bcsnowmobileshow_2016`}
            />
            <Redirect
                from={`${path}/Vmdqex4AAB0AxBYc`}
                to={`${path}/youth-snow-safety-phoenixmnt-2016`}
            />
            <Redirect
                from={`${path}/VnCZbR8AAFYKrNgo`}
                to={`${path}/aad-kananaskis-jan-2016`}
            />
            <Redirect
                from={`${path}/VoQjoR8AADZzIjEZ`}
                to={`${path}/aad-whitewater-jan-2016`}
            />
            <Redirect
                from={`${path}/VnCX1h8AAFYKrM88`}
                to={`${path}/lake-louise-staying-alive-2016`}
            />
            <Redirect
                from={`${path}/VliqsR0AAOcTy0Ig`}
                to={`${path}/aad-general-announcement-2016`}
            />
            <Redirect
                from={`${path}/VpfKah8AAI1FMEHK`}
                to={`${path}/aad-mtseymour-jan-2016`}
            />
            <Redirect
                from={`${path}/Vpf4ACMAACQAX8yN`}
                to={`${path}/aad-bouldermnt-revelstoke-2016`}
            />
            <Redirect
                from={`${path}/VsukNiMAACwavKfV`}
                to={`${path}/shreducation-yukon-feb-2016`}
            />
            <Redirect
                from={`${path}/VmdsER4AAPYJxB90`}
                to={`${path}/aad-lake-louise-2016`}
            />
            <Redirect
                from={`${path}/VoQkah8AAEZvIjSt`}
                to={`${path}/aad-khmr-jan-2016`}
            />
            <Redirect
                from={`${path}/VlyuDyUAACUAnMJ-`}
                to={`${path}/baw-fernie-jan-2016`}
            />
            <Redirect
                from={`${path}/Vo1p7yIAAMcFB2W7`}
                to={`${path}/aad-rossland-jan-2016`}
            />
            <Redirect
                from={`${path}/VpfMIx8AAKlFMEwl`}
                to={`${path}/aad-crowsnestpass-jan-2016`}
            />
            <Redirect
                from={`${path}/Vp1xcSYAACUAQUbq`}
                to={`${path}/aad-mtsima-jan-2016`}
            />
            <Redirect
                from={`${path}/VlywoyUAACQAnNG8`}
                to={`${path}/shreducation-revelstoke-jan-2016`}
            />
            <Redirect
                from={`${path}/VvHBBCwAAAisDiFM`}
                to={`${path}/avalanche-rescue-challenge-stewart-2016`}
            />
            <Redirect
                from={`${path}/VvLUTCUAAMEAAc3N`}
                to={`${path}/saskatchewan-snowmobile-show-nov-2016`}
            />
            <Redirect
                from={`${path}/VnCWSR8AAMoKrMX6`}
                to={`${path}/aad-garibaldi-jan-2016`}
            />
            <Redirect
                from={`${path}/VpRUhx8AABsHG57y`}
                to={`${path}/aad-kakwa-feb-2016`}
            />
            <Redirect
                from={`${path}/VpfOKCMAACIAXtdX`}
                to={`${path}/rumrunner-cherrybowl-presentation-2016`}
            />
            <Redirect
                from={`${path}/VrJnQisAAGMj2Y_U`}
                to={`${path}/ascend-splitboard-fest-2016`}
            />
            <Redirect
                from={`${path}/VrpuBSgAAEIC5kXJ`}
                to={`${path}/acc-cherrybowl-presentation-2016`}
            />
            <Redirect
                from={`${path}/VK8DjSMAACUANEm1`}
                to={`${path}/foundation-calgary-fundraiser-2016`}
            />
            <Redirect
                from={`${path}/VvBrrywAAHOKBjIg`}
                to={`${path}/bcsf-agm-pemberton-2016`}
            />
            <Redirect
                from={`${path}/VkTj0CAAAB8AKQs5`}
                to={`${path}/staying-alive-khmr-dec-2015`}
            />
            <Redirect
                from={`${path}/VmdlSR4AAAMNw_cW`}
                to={`${path}/aad-mt-cain-feb-2016`}
            />
            <Redirect
                from={`${path}/VoQlZx8AAEZvIjpK`}
                to={`${path}/aad-fernie-alpine-resort-2016`}
            />
            <Redirect
                from={`${path}/VownoR8AAIinUi2W`}
                to={`${path}/aad-apex-jan-2016`}
            />
            <Redirect
                from={`${path}/VpRSkB8AAOELG5N2`}
                to={`${path}/aad-whistler-jan-2016`}
            />
            <Redirect
                from={`${path}/VpmCByMAAFUcaOGm`}
                to={`${path}/aad-rmr-jan-2016`}
            />
            <Redirect
                from={`${path}/VqkoRSQAACUAbEwW`}
                to={`${path}/youth-sled-day-revelstoke-2016`}
            />
            <Redirect
                from={`${path}/VvLCACUAAMEAAWBL`}
                to={`${path}/avcan-agm-vancouver-fall-2016`}
            />
            <Redirect
                from={`${path}/VyE6eiYAAJURUa72`}
                to={`${path}/caa-spring-conference-case-studies-2016`}
            />
            <Redirect
                from={`${path}/VvF1CSwAAGKgDF2C`}
                to={`${path}/issw-2016-breckenridge`}
            />
            <Redirect
                from={`${path}/Vmdhxx4AAAQNw-Jb`}
                to={`${path}/aad-banff-jan-2016`}
            />
            <Redirect
                from={`${path}/Vqfpwh4AACMAso45`}
                to={`${path}/aad-smithers-2016`}
            />
            <Redirect
                from={`${path}/VvB06CwAAIqKBmhf`}
                to={`${path}/isc-2016-snowmobile`}
            />
            <Route path={`${path}/:uid`} component={Feed.EventPost} />
            <Route path={path} component={Feed.EventFeed} />
        </Switch>
    )
}
function incidents({ match }) {
    const { path } = match

    return (
        <Switch>
            <Route path={`${path}/:id`} component={IncidentDetails} />
            <Route path={path} component={IncidentsList} />
        </Switch>
    )
}
function pages({ match }) {
    const { path } = match

    return (
        <Switch>
            <Route path={`${path}/${STATIC_PAGE}`} render={staticPage} />
            <Route path={`${path}/${GENERIC}`} render={generic} />
        </Switch>
    )
}
function staticPage({ match }) {
    const { path } = match

    return (
        <Switch>
            <Redirect from={`${path}/planning`} to="/planning" />
            <Redirect
                from={`${path}/decision-making`}
                to="/planning/decision-making"
            />
            <Redirect from={`${path}/sled`} to="/sled" />
            <Redirect from={`${path}/youth`} to="/youth" />
            <Redirect from={`${path}/essential-gear`} to="/gear" />
            <Redirect from={`${path}/training`} to="/training" />
            <Redirect
                from={`${path}/mountain-information-network-overview`}
                to="/mountain-information-network"
            />
            <Redirect
                from={`${path}/mountain-information-network-submission-guidelines`}
                to="/mountain-information-network/submission-guidelines"
            />
            <Redirect from={`${path}/about`} to="/about" />
            <Redirect
                from={`${path}/mountain-information-network-faq`}
                to="/mountain-information-network/faq"
            />
            <Redirect from={`${path}/ambassadors`} to="/ambassadors" />
            <Redirect from={`${path}/sponsors`} to="/sponsors" />
            <Redirect from={`${path}/collaborators`} to="/collaborators" />
            <Redirect from={`${path}/membership-overview`} to="/membership" />
            <Route
                path={`${path}/:uid`}
                render={() => <prismic.StaticPage {...match.params} />}
            />
        </Switch>
    )
}
function generic({ match }) {
    const { path } = match

    return (
        <Switch>
            <Redirect from={`${path}/privacy-policy`} to="/privacy-policy" />
            <Redirect from={`${path}/terms-of-use`} to="/terms-of-use" />
            <Route
                path={`${path}/:uid`}
                render={() => <prismic.Generic {...match.params} />}
            />
        </Switch>
    )
}
function min({ match }) {
    const { path } = match

    return (
        <Switch>
            <Redirect
                from={`${path}/submissions/:id`}
                to="/mountain-information-network/submissions/:id"
            />
            <Redirect
                from={`${path}/:page`}
                to="/mountain-information-network/:page"
            />
            <Redirect from={path} to="/mountain-information-network" />
        </Switch>
    )
}
function tutorial(props) {
    return (
        <Bundle load={loadTutorial}>
            {Component =>
                Component ? (
                    <Component {...props} />
                ) : (
                    <Page.Page>
                        <Page.Content>
                            <h1>
                                <Loading />
                            </h1>
                        </Page.Content>
                    </Page.Page>
                )
            }
        </Bundle>
    )
}
function tutoriel({ match }) {
    const { path } = match
    const STYLE = {
        justifyContent: 'center',
        padding: '1em',
    }

    return (
        <Fragment>
            <Redirect strict exact from={`${path}/`} to={path} />
            <Route
                path={path}
                render={() => (
                    <Alert style={STYLE}>
                        Quelques sections de notre tutoriel ne sont pas à jour.
                        Revenez regulièrement pour consulter les améliorations
                        que nous y apportons.
                        <br />
                        Some sections of the French tutorial are outdated. We
                        are currently working on improvements so stay tuned for
                        updates!
                    </Alert>
                )}
            />
            <Route path={path} render={tutorial} />
        </Fragment>
    )
}
