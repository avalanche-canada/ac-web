import React, { Component } from 'react'
import Application from 'components/application'
import { Router, Redirect } from '@reach/router'
import Null from 'components/Null'
import { NotFound, WorkInProgress } from 'components/page'
import LoginComplete from './LoginComplete'
import Login from './Login'
import Navbar from './Navbar'
import SPAW from './SPAW'
import Highlight from './Highlight'
import Footer from 'components/footer'
import Main from 'layouts/main'
import Tutorial from './tutorial'
import { Courses, Providers } from './Ast'
import MountainInformationNetwork from './MountainInformationNetwork'
import Weather from './weather'
import HotZoneReport from './HotZoneReport'
import { IncidentsList, IncidentDetails } from './Incidents'
import HotZoneList from './HotZoneList'
import Forecast from './Forecast'
import TripPlanner from './TripPlanner'
import * as Feed from './feed'
import Glossary from 'layouts/Glossary'
import ErrorBoundary from 'components/ErrorBoundary'
import StaticComponent from 'components/StaticComponent'
import { Error } from 'components/text'
import * as Page from 'components/page'
import { ButtonSet } from 'components/button'
import styles from 'components/page/Page.css'
import { Provider as SponsorsMetadataProvider } from 'contexts/sponsors'
import { StaticPage, Generic } from 'prismic/layouts'
import { GENERIC, STATIC_PAGE } from 'constants/prismic'
import { NEWS, BLOG, EVENT } from 'constants/prismic'

export default class AvalancheCanada extends StaticComponent {
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
                    <ErrorBoundary fallback={this.renderError}>
                        <Router>
                            <Main path="map/*" />
                            <Redirect from="/" to="/map" />
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
                            <LoginComplete path="login-complete" />
                            <Login path="login" />
                            <Glossary path="glossary/*" />
                            <Tutorial path="tutorial/*" />
                            <HotZoneReport path="hot-zone-reports/*" />
                            <HotZoneList path="hot-zones/*" />
                            <Forecast path="forecasts/*" />
                            <Blogs path="blogs/*" />
                            <News path="news/*" />
                            <Events path="events/*" />
                            <Incidents path="incidents/*" />
                            <MIN path="min/*" />
                            <MountainInformationNetwork path="mountain-information-network/*" />
                            <Redirect
                                from="/submit"
                                to="/mountain-information-network/submit"
                            />

                            <Weather path="weather/*" />
                            <Courses path="training/courses" />
                            <Providers path="training/providers" />
                            <StaticPage
                                path="about"
                                uid="about"
                                title="About"
                            />
                            <StaticPage
                                path="early-season-conditions"
                                uid="early-season-conditions"
                                title="Early Season Conditions"
                            />
                            <StaticPage path="faq" uid="faq" title="FAQ" />
                            <TripPlanner path="planning/trip-planner" />
                            <StaticPage
                                path="planning/decision-making"
                                uid="decision-making"
                                title="Decision Making"
                            />
                            <StaticPage
                                path="planning"
                                uid="planning"
                                title="Planning"
                            />
                            <StaticPage
                                path="information"
                                uid="information"
                                title="Information"
                            />
                            <StaticPage path="sled" uid="sled" title="Sled" />
                            <StaticPage
                                path="youth"
                                uid="youth"
                                title="Youth"
                            />
                            <StaticPage
                                path="gear"
                                uid="essential-gear"
                                title="Essential Gear"
                            />
                            <StaticPage
                                path="training"
                                uid="training"
                                title="Go Farther — Get Avalanche Trained"
                            />
                            <StaticPage
                                path="education"
                                uid="education"
                                title="Go Farther — Get Avalanche Trained"
                            />
                            <StaticPage
                                path="instructing-ast"
                                uid="instructing-ast"
                                title="Teaching Avalanche Skills Training (AST)"
                            />
                            <StaticPage
                                path="ambassadors"
                                uid="ambassadors"
                                title="Ambassadors"
                            />
                            <StaticPage
                                path="sponsors"
                                uid="sponsors"
                                title="Sponsors"
                            />
                            <StaticPage
                                path="collaborators"
                                uid="collaborators"
                                title="Collaborators"
                            />
                            <StaticPage
                                path="membership"
                                uid="membership-overview"
                                title="Membership Overview"
                            />
                            <Generic
                                path="privacy-policy"
                                uid="privacy-policy"
                                title="Privacy Policy"
                            />
                            <Generic
                                path="terms-of-use"
                                uid="terms-of-use"
                                title="Terms of use"
                            />
                            <WorkInProgress
                                path="tutoriel"
                                name="French Tutorial / Tutoriel"
                                oldUrl="http://old.avalanche.ca/fr/cac/training/online-course"
                                title={defaultTitle =>
                                    `${defaultTitle}<br />Nous travaillons présentement sur cette page...`
                                }
                                subtitle={defaultSubtitle =>
                                    `${defaultSubtitle}<br />Pour l'instant, vous pouvez consulter cette page sur notre ancien site.`
                                }
                            />
                            <Pages path="pages" />
                            <NotFound default />
                        </Router>
                    </ErrorBoundary>
                    <Router primary={false}>
                        <Null path="map/*" />
                        <Null path="planning/trip-planner" />
                        <Null path="tutoriel" />
                        <Footer default />
                    </Router>
                </Application>
            </SponsorsMetadataProvider>
        )
    }
}

// Subroutes
// Create renderers to split concerns and reduce to initial rendering
function Blogs() {
    return (
        <Router>
            <Feed.BlogPostFeed path="/" />
            <Feed.Post path=":uid" type={BLOG} />
        </Router>
    )
}
function News() {
    return (
        <Router>
            <Feed.NewsFeed path="/" />
            <Feed.Post path=":uid" type={NEWS} />
            <Redirect from="V-r0EyYAACcAbkKw" to="register-now" />
            <Redirect
                from="V8hpNyQAABuEOE6V"
                to="avalanche-canada-has-brand-new-youth-tool-boxes-available"
            />
            <Redirect
                from="V9Br8SYAACcAzxmI"
                to="calgary-foundation-grant-award"
            />
            <Redirect from="Vow8-R8AAFDJUq1b" to="transceiver-interference" />
            <Redirect from="VEV1hyYAAKwITagl" to="annual-report-2014" />
            <Redirect
                from="VIDCKCsAACcAgEpK"
                to="donation-request-avalanche-canada"
            />
            <Redirect
                from="VL63mCUAACYAOeVo"
                to="canuck-splitfest-fundraiser-success-2015"
            />
            <Redirect
                from="VL7ZgiUAACMAOilw"
                to="thunderstruck-fundraiser-donation-2015"
            />
            <Redirect
                from="VNASWCUAAJQpqGrY"
                to="deep-winter-photo-challenge-fundraiser-2015"
            />
            <Redirect
                from="VT_rPiYAACUAbasG"
                to="mountain-weather-forecast-summer"
            />
            <Redirect from="VftedR8AAIYAI8QW" to="acc-new-hut" />
            <Redirect from="ViGKDCEAAEwWNpIz" to="agm-2015" />
            <Redirect
                from="VHZlwSgAACYAw466"
                to="boundary-changes-south-rockies"
            />
            <Redirect
                from="VH-XbykAACwAQbtc"
                to="arcteryx-deep-winter-photo-challenge-2014"
            />
            <Redirect
                from="VJIKXCcAACYAFiD-"
                to="avalanche-awareness-days-2015"
            />
            <Redirect
                from="VLbN0CMAALqmQ9tp"
                to="introduction-mountain-information-network"
            />
            <Redirect from="VRmZzR8AAOIMXMnP" to="agm-october-announcement" />
            <Redirect from="VZ7psx0AAB0AuUBl" to="recall-bd-jetforce-airbag" />
            <Redirect
                from="ViauYB0AAHAHUPr_"
                to="new-support-craig-kelly-fund"
            />
            <Redirect from="ViayAx0AAB4AURDZ" to="cora-shea-memorial-awards" />
            <Redirect
                from="VkDizCEAAJsBkh2d"
                to="bca-backcountry-basics-videos"
            />
            <Redirect
                from="VDbtkScAAKUBPZm5"
                to="introducing-avalanche-canada"
            />
            <Redirect
                from="VH5GLSMAACcAc0vA"
                to="snorider-brent-strand-announcement"
            />
            <Redirect from="VIockywAACsA-wP3" to="forecasts-inbox-rss" />
            <Redirect
                from="VL6NXiUAACYAOZA3"
                to="announcement-new-mountain-weather-forecast"
            />
            <Redirect
                from="VP9AZR4AACQAlToR"
                to="land-thundering-snow-launch"
            />
            <Redirect from="VRrR-x8AAKBCX0JI" to="recall-ortovox-s1" />
            <Redirect
                from="VQh-RikAACgA6K4B"
                to="calgary-fundraiser-success-2015"
            />
            <Redirect from="VdNwyB8AAE4Ln13g" to="al-hodgson-memorial-fund" />
            <Redirect
                from="VEbXGiYAACsAaNZV"
                to="five-snowmobile-safety-messages"
            />
            <Redirect from="VEbHaSYAACsAaLc_" to="tedx-talk-risk" />
            <Redirect from="VH-KSykAACkAQaCR" to="baw-success-2014" />
            <Redirect
                from="VIivUisAACYAY0tp"
                to="avalanche-canada-widget-update"
            />
            <Redirect
                from="VIoEBSwAACsA-tKL"
                to="dramatic-rescue-clemina-creek"
            />
            <Redirect from="VEVy9CYAACQATaL-" to="justin-trudeau-message" />
            <Redirect from="VVtiryYAAOwJxyOO" to="recall-msr-snow-shovels" />
            <Redirect from="VMgrmyUAAJQpmL6o" to="min-how-to-videos" />
            <Redirect from="VjkZEB0AAB0AV7J4" to="annual-report-2015" />
            <Redirect
                from="VkogLh8AAB0AI-ag"
                to="free-ast-youth-course-fernie"
            />
            <Redirect from="Vk4VIh4AAG8G0bZg" to="new-sponsor-g3" />
            <Redirect
                from="VlN8siIAAFANmCkM"
                to="new-release-throttle-decisions"
            />
            <Redirect
                from="VlYciR0AADgEB1Sp"
                to="cross-border-collaboration-training"
            />
            <Redirect
                from="VpPu3h8AAKAFGUI2"
                to="avalanche-awareness-days-primer"
            />
            <Redirect
                from="VrOc4CsAACwA4KjU"
                to="pr-bc-coroner-avalanche-feb3"
            />
            <Redirect
                from="VrjoXiYAAEwCjmRs"
                to="avalanche-ambassador-aad-revelstoke"
            />
            <Redirect from="VN0YqSYAACoAJakp" to="membership-drive" />
            <Redirect from="Vst0dyMAADoSu4_N" to="al-hodgson-memorial-award" />
            <Redirect from="Vplv7SMAAFQcaHWb" to="sfu-new-research-chair" />
            <Redirect from="VpV_lx8AAMUSIpac" to="min-update" />
            <Redirect
                from="VuxMXiwAALFL7Yyb"
                to="foundation-calgary-benefit-2016"
            />
            <Redirect from="VjukhiMAACQA2fJX" to="new-office-space" />
            <Redirect
                from="VnHASR8AAIoSs8eR"
                to="thunderstruck-rsc-fundraiser"
            />
            <Redirect
                from="Vw6XMCkAAD9f09uB"
                to="craig-kelly-scholarship-awarded"
            />
            <Redirect from="Vx-6kSkAAEG1OTEL" to="hot-zone-reports" />
            <Redirect from="Vk0CliEAAKIFhX3l" to="2015-service-award" />
            <Redirect
                from="Vh1iVx4AALsES5Zw"
                to="avalanche-ambassador-program-announcement"
            />
            <Redirect from="VyeeSiYAAASDd20a" to="land-of-thundering-snow" />
            <Redirect from="VpP3lB8AAKAFGXVS" to="canuck-splitfest-2016" />
            <Redirect from="VK7R4iMAACMAM93b" to="snowmobile-loaners-2016" />
            <Redirect
                from="VuhTEiwAAMEK1gWI"
                to="adjunct-professor-announcement"
            />
            <Redirect
                from="Vw_rICkAALuO27JE"
                to="royal-canadian-pacific-fundraiser"
            />
        </Router>
    )
}
function Events() {
    return (
        <Router>
            <Feed.EventFeed path="/" />
            <Feed.Post path=":uid" type={EVENT} />
            <Redirect from="VvLeBSUAAJgDAgX6" to="asa-snowmobile-show-2016" />
            <Redirect from="V-r2XyYAACcAblCX" to="spin-safety-fundraiser" />
            <Redirect
                from="VEFS_yYAACYARWyK"
                to="thunderstuck-fundraiser-2016"
            />
            <Redirect
                from="V9bxeiYAACgA9jex"
                to="cardel-homes-movie-ruin-rose"
            />
            <Redirect from="V9By4yYAACgAz0Ni" to="agm-save-the-date-2016" />
            <Redirect from="V7Sy6ycAACUAo4u_" to="bcsnowmobileshow_2016" />
            <Redirect
                from="Vmdqex4AAB0AxBYc"
                to="youth-snow-safety-phoenixmnt-2016"
            />
            <Redirect from="VnCZbR8AAFYKrNgo" to="aad-kananaskis-jan-2016" />
            <Redirect from="VoQjoR8AADZzIjEZ" to="aad-whitewater-jan-2016" />
            <Redirect
                from="VnCX1h8AAFYKrM88"
                to="lake-louise-staying-alive-2016"
            />
            <Redirect
                from="VliqsR0AAOcTy0Ig"
                to="aad-general-announcement-2016"
            />
            <Redirect from="VpfKah8AAI1FMEHK" to="aad-mtseymour-jan-2016" />
            <Redirect
                from="Vpf4ACMAACQAX8yN"
                to="aad-bouldermnt-revelstoke-2016"
            />
            <Redirect
                from="VsukNiMAACwavKfV"
                to="shreducation-yukon-feb-2016"
            />
            <Redirect from="VmdsER4AAPYJxB90" to="aad-lake-louise-2016" />
            <Redirect from="VoQkah8AAEZvIjSt" to="aad-khmr-jan-2016" />
            <Redirect from="VlyuDyUAACUAnMJ-" to="baw-fernie-jan-2016" />
            <Redirect from="Vo1p7yIAAMcFB2W7" to="aad-rossland-jan-2016" />
            <Redirect from="VpfMIx8AAKlFMEwl" to="aad-crowsnestpass-jan-2016" />
            <Redirect from="Vp1xcSYAACUAQUbq" to="aad-mtsima-jan-2016" />
            <Redirect
                from="VlywoyUAACQAnNG8"
                to="shreducation-revelstoke-jan-2016"
            />
            <Redirect
                from="VvHBBCwAAAisDiFM"
                to="avalanche-rescue-challenge-stewart-2016"
            />
            <Redirect
                from="VvLUTCUAAMEAAc3N"
                to="saskatchewan-snowmobile-show-nov-2016"
            />
            <Redirect from="VnCWSR8AAMoKrMX6" to="aad-garibaldi-jan-2016" />
            <Redirect from="VpRUhx8AABsHG57y" to="aad-kakwa-feb-2016" />
            <Redirect
                from="VpfOKCMAACIAXtdX"
                to="rumrunner-cherrybowl-presentation-2016"
            />
            <Redirect
                from="VrJnQisAAGMj2Y_U"
                to="ascend-splitboard-fest-2016"
            />
            <Redirect
                from="VrpuBSgAAEIC5kXJ"
                to="acc-cherrybowl-presentation-2016"
            />
            <Redirect
                from="VK8DjSMAACUANEm1"
                to="foundation-calgary-fundraiser-2016"
            />
            <Redirect from="VvBrrywAAHOKBjIg" to="bcsf-agm-pemberton-2016" />
            <Redirect
                from="VkTj0CAAAB8AKQs5"
                to="staying-alive-khmr-dec-2015"
            />
            <Redirect from="VmdlSR4AAAMNw_cW" to="aad-mt-cain-feb-2016" />
            <Redirect
                from="VoQlZx8AAEZvIjpK"
                to="aad-fernie-alpine-resort-2016"
            />
            <Redirect from="VownoR8AAIinUi2W" to="aad-apex-jan-2016" />
            <Redirect from="VpRSkB8AAOELG5N2" to="aad-whistler-jan-2016" />
            <Redirect from="VpmCByMAAFUcaOGm" to="aad-rmr-jan-2016" />
            <Redirect
                from="VqkoRSQAACUAbEwW"
                to="youth-sled-day-revelstoke-2016"
            />
            <Redirect
                from="VvLCACUAAMEAAWBL"
                to="avcan-agm-vancouver-fall-2016"
            />
            <Redirect
                from="VyE6eiYAAJURUa72"
                to="caa-spring-conference-case-studies-2016"
            />
            <Redirect from="VvF1CSwAAGKgDF2C" to="issw-2016-breckenridge" />
            <Redirect from="Vmdhxx4AAAQNw-Jb" to="aad-banff-jan-2016" />
            <Redirect from="Vqfpwh4AACMAso45" to="aad-smithers-2016" />
            <Redirect from="VvB06CwAAIqKBmhf" to="isc-2016-snowmobile" />
        </Router>
    )
}
function Incidents() {
    return (
        <Router>
            <IncidentsList path="/" />
            <IncidentDetails path=":id" />
        </Router>
    )
}
function Pages() {
    return (
        <Router>
            <StaticPagePages path={`${STATIC_PAGE}/*`} />
            <GenericPages path={`${GENERIC}/*`} />
        </Router>
    )
}
function StaticPagePages() {
    return (
        <Router>
            <Redirect from="planning" to="/planning" />
            <Redirect from="decision-making" to="/planning/decision-making" />
            <Redirect from="sled" to="/sled" />
            <Redirect from="youth" to="/youth" />
            <Redirect from="essential-gear" to="/gear" />
            <Redirect from="training" to="/training" />
            <Redirect
                from="mountain-information-network-overview"
                to="/mountain-information-network"
            />
            <Redirect
                from="mountain-information-network-submission-guidelines"
                to="/mountain-information-network/submission-guidelines"
            />
            <Redirect from="about" to="/about" />
            <Redirect
                from="mountain-information-network-faq"
                to="/mountain-information-network/faq"
            />
            <Redirect from="ambassadors" to="/ambassadors" />
            <Redirect from="sponsors" to="/sponsors" />
            <Redirect from="collaborators" to="/collaborators" />
            <Redirect from="membership-overview" to="/membership" />
            <StaticPage path=":uid" />
        </Router>
    )
}
function GenericPages() {
    return (
        <Router>
            <Redirect from="privacy-policy" to="/privacy-policy" />
            <Redirect from="terms-of-use" to="/terms-of-use" />
            <Generic path=":uid" />
        </Router>
    )
}
function MIN() {
    return (
        <Router>
            <Redirect
                from="submissions/:id"
                to="/mountain-information-network/submissions/:id"
            />
            <Redirect from=":page" to="/mountain-information-network/:page" />
            <Redirect from="/" to="/mountain-information-network" />
        </Router>
    )
}
