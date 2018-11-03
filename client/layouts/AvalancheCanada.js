import React from 'react'
import { memo } from 'utils/react'
import Application from 'components/application'
import { Router, Redirect } from '@reach/router'
import Null from 'components/Null'
import LoginComplete from './LoginComplete'
import Navbar from './Navbar'
import SPAW from './SPAW'
import Highlight from './Highlight'
import Footer from 'components/footer'
import Main from 'layouts/main'
import Tutorial from './tutorial'
import Ast from './ast'
import MountainInformationNetwork from './MountainInformationNetwork'
import Weather from './weather'
import HotZoneReport from './HotZoneReport'
import Incidents from './incidents'
import HotZoneList from './HotZoneList'
import Forecast from './Forecast'
import TripPlanner from './TripPlanner'
import * as Feed from './feed'
import Glossary from 'layouts/glossary'
import ErrorBoundary from 'components/ErrorBoundary'
import { Error } from 'components/text'
import * as Page from 'components/page'
import { ButtonSet } from 'components/button'
import { Provider as SponsorsMetadataProvider } from 'contexts/sponsors'
import { Provider as AuthProvider } from 'contexts/auth'
import { Provider as MapStateProvider } from 'contexts/map/state'
import { StaticPage, GenericPage } from 'prismic/layouts'
import { GENERIC, STATIC_PAGE } from 'constants/prismic'
import { NEWS, BLOG, EVENT } from 'constants/prismic'
import styles from 'components/page/Page.css'

function AvalancheCanada() {
    return (
        <AuthProvider>
            <SponsorsMetadataProvider>
                <MapStateProvider>
                    <Application>
                        <Navbar />
                        <SPAW />
                        <Highlight />
                        <ErrorBoundary fallback={renderError}>
                            {/* FIXME: Make it primary. With primary clicking a region on the map make the map jumping. */}
                            <Router primary={false}>
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
                                <Redirect
                                    from="/trip-planning"
                                    to="/planning"
                                />
                                <Redirect
                                    from="/forecast/:name"
                                    to="/forecasts/:name"
                                />
                                <Redirect from="/learn" to="/training" />
                                <LoginComplete path="login-complete" />
                                <Glossary path="glossary/*" />
                                <Tutorial path="tutorial/*" />
                                <Tutorial path="tutoriel/*" />
                                <HotZoneReport path="hot-zone-reports/*" />
                                <HotZoneList path="hot-zones/*" />
                                <Forecast path="forecasts/*" />
                                <Redirect from={BLOG} to="/blogs" />
                                <Blogs path="blogs/*" />
                                <News path="news/*" />
                                <Redirect from={EVENT} to="/events" />
                                <Events path="events/*" />
                                <Incidents path="incidents/*" />
                                <MIN path="min/*" />
                                <MountainInformationNetwork path="mountain-information-network/*" />
                                <Redirect
                                    from="/submit"
                                    to="/mountain-information-network/submit"
                                />

                                <Weather path="weather/*" />
                                <Ast path="training/*" />
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
                                <StaticPage
                                    path="sled"
                                    uid="sled"
                                    title="Sled"
                                />
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
                                    path="privacy-policy"
                                    uid="privacy-policy"
                                    title="Privacy Policy"
                                />
                                <GenericPage
                                    path="terms-of-use"
                                    uid="terms-of-use"
                                    title="Terms of use"
                                />
                                <Pages path="pages/*" />
                                <Page.NotFound default />
                            </Router>
                        </ErrorBoundary>
                        <Router primary={false}>
                            <Null path="map/*" />
                            <Null path="planning/trip-planner" />
                            <Null path="tutoriel" />
                            <Footer default />
                        </Router>
                    </Application>
                </MapStateProvider>
            </SponsorsMetadataProvider>
        </AuthProvider>
    )
}

export default memo.static(AvalancheCanada)

function renderError({ error }) {
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
function News({ uri }) {
    return (
        <Router>
            <Feed.NewsFeed path="/" />
            <Feed.Post path=":uid" type={NEWS} />
            <Redirect from="V-r0EyYAACcAbkKw" to={`${uri}/register-now`} />
            <Redirect
                from="V8hpNyQAABuEOE6V"
                to={`${uri}/avalanche-canada-has-brand-new-youth-tool-boxes-available`}
            />
            <Redirect
                from="V9Br8SYAACcAzxmI"
                to={`${uri}/calgary-foundation-grant-award`}
            />
            <Redirect
                from="Vow8-R8AAFDJUq1b"
                to={`${uri}/transceiver-interference`}
            />
            <Redirect
                from="VEV1hyYAAKwITagl"
                to={`${uri}/annual-report-2014`}
            />
            <Redirect
                from="VIDCKCsAACcAgEpK"
                to={`${uri}/donation-request-avalanche-canada`}
            />
            <Redirect
                from="VL63mCUAACYAOeVo"
                to={`${uri}/canuck-splitfest-fundraiser-success-2015`}
            />
            <Redirect
                from="VL7ZgiUAACMAOilw"
                to={`${uri}/thunderstruck-fundraiser-donation-2015`}
            />
            <Redirect
                from="VNASWCUAAJQpqGrY"
                to={`${uri}/deep-winter-photo-challenge-fundraiser-2015`}
            />
            <Redirect
                from="VT_rPiYAACUAbasG"
                to={`${uri}/mountain-weather-forecast-summer`}
            />
            <Redirect from="VftedR8AAIYAI8QW" to={`${uri}/acc-new-hut`} />
            <Redirect from="ViGKDCEAAEwWNpIz" to={`${uri}/agm-2015`} />
            <Redirect
                from="VHZlwSgAACYAw466"
                to={`${uri}/boundary-changes-south-rockies`}
            />
            <Redirect
                from="VH-XbykAACwAQbtc"
                to={`${uri}/arcteryx-deep-winter-photo-challenge-2014`}
            />
            <Redirect
                from="VJIKXCcAACYAFiD-"
                to={`${uri}/avalanche-awareness-days-2015`}
            />
            <Redirect
                from="VLbN0CMAALqmQ9tp"
                to={`${uri}/introduction-mountain-information-network`}
            />
            <Redirect
                from="VRmZzR8AAOIMXMnP"
                to={`${uri}/agm-october-announcement`}
            />
            <Redirect
                from="VZ7psx0AAB0AuUBl"
                to={`${uri}/recall-bd-jetforce-airbag`}
            />
            <Redirect
                from="ViauYB0AAHAHUPr_"
                to={`${uri}/new-support-craig-kelly-fund`}
            />
            <Redirect
                from="ViayAx0AAB4AURDZ"
                to={`${uri}/cora-shea-memorial-awards`}
            />
            <Redirect
                from="VkDizCEAAJsBkh2d"
                to={`${uri}/bca-backcountry-basics-videos`}
            />
            <Redirect
                from="VDbtkScAAKUBPZm5"
                to={`${uri}/introducing-avalanche-canada`}
            />
            <Redirect
                from="VH5GLSMAACcAc0vA"
                to={`${uri}/snorider-brent-strand-announcement`}
            />
            <Redirect
                from="VIockywAACsA-wP3"
                to={`${uri}/forecasts-inbox-rss`}
            />
            <Redirect
                from="VL6NXiUAACYAOZA3"
                to={`${uri}/announcement-new-mountain-weather-forecast`}
            />
            <Redirect
                from="VP9AZR4AACQAlToR"
                to={`${uri}/land-thundering-snow-launch`}
            />
            <Redirect from="VRrR-x8AAKBCX0JI" to={`${uri}/recall-ortovox-s1`} />
            <Redirect
                from="VQh-RikAACgA6K4B"
                to={`${uri}/calgary-fundraiser-success-2015`}
            />
            <Redirect
                from="VdNwyB8AAE4Ln13g"
                to={`${uri}/al-hodgson-memorial-fund`}
            />
            <Redirect
                from="VEbXGiYAACsAaNZV"
                to={`${uri}/five-snowmobile-safety-messages`}
            />
            <Redirect from="VEbHaSYAACsAaLc_" to={`${uri}/tedx-talk-risk`} />
            <Redirect from="VH-KSykAACkAQaCR" to={`${uri}/baw-success-2014`} />
            <Redirect
                from="VIivUisAACYAY0tp"
                to={`${uri}/avalanche-canada-widget-update`}
            />
            <Redirect
                from="VIoEBSwAACsA-tKL"
                to={`${uri}/dramatic-rescue-clemina-creek`}
            />
            <Redirect
                from="VEVy9CYAACQATaL-"
                to={`${uri}/justin-trudeau-message`}
            />
            <Redirect
                from="VVtiryYAAOwJxyOO"
                to={`${uri}/recall-msr-snow-shovels`}
            />
            <Redirect from="VMgrmyUAAJQpmL6o" to={`${uri}/min-how-to-videos`} />
            <Redirect
                from="VjkZEB0AAB0AV7J4"
                to={`${uri}/annual-report-2015`}
            />
            <Redirect
                from="VkogLh8AAB0AI-ag"
                to={`${uri}/free-ast-youth-course-fernie`}
            />
            <Redirect from="Vk4VIh4AAG8G0bZg" to={`${uri}/new-sponsor-g3`} />
            <Redirect
                from="VlN8siIAAFANmCkM"
                to={`${uri}/new-release-throttle-decisions`}
            />
            <Redirect
                from="VlYciR0AADgEB1Sp"
                to={`${uri}/cross-border-collaboration-training`}
            />
            <Redirect
                from="VpPu3h8AAKAFGUI2"
                to={`${uri}/avalanche-awareness-days-primer`}
            />
            <Redirect
                from="VrOc4CsAACwA4KjU"
                to={`${uri}/pr-bc-coroner-avalanche-feb3`}
            />
            <Redirect
                from="VrjoXiYAAEwCjmRs"
                to={`${uri}/avalanche-ambassador-aad-revelstoke`}
            />
            <Redirect from="VN0YqSYAACoAJakp" to={`${uri}/membership-drive`} />
            <Redirect
                from="Vst0dyMAADoSu4_N"
                to={`${uri}/al-hodgson-memorial-award`}
            />
            <Redirect
                from="Vplv7SMAAFQcaHWb"
                to={`${uri}/sfu-new-research-chair`}
            />
            <Redirect from="VpV_lx8AAMUSIpac" to={`${uri}/min-update`} />
            <Redirect
                from="VuxMXiwAALFL7Yyb"
                to={`${uri}/foundation-calgary-benefit-2016`}
            />
            <Redirect from="VjukhiMAACQA2fJX" to={`${uri}/new-office-space`} />
            <Redirect
                from="VnHASR8AAIoSs8eR"
                to={`${uri}/thunderstruck-rsc-fundraiser`}
            />
            <Redirect
                from="Vw6XMCkAAD9f09uB"
                to={`${uri}/craig-kelly-scholarship-awarded`}
            />
            <Redirect from="Vx-6kSkAAEG1OTEL" to={`${uri}/hot-zone-reports`} />
            <Redirect
                from="Vk0CliEAAKIFhX3l"
                to={`${uri}/2015-service-award`}
            />
            <Redirect
                from="Vh1iVx4AALsES5Zw"
                to={`${uri}/avalanche-ambassador-program-announcement`}
            />
            <Redirect
                from="VyeeSiYAAASDd20a"
                to={`${uri}/land-of-thundering-snow`}
            />
            <Redirect
                from="VpP3lB8AAKAFGXVS"
                to={`${uri}/canuck-splitfest-2016`}
            />
            <Redirect
                from="VK7R4iMAACMAM93b"
                to={`${uri}/snowmobile-loaners-2016`}
            />
            <Redirect
                from="VuhTEiwAAMEK1gWI"
                to={`${uri}/adjunct-professor-announcement`}
            />
            <Redirect
                from="Vw_rICkAALuO27JE"
                to={`${uri}/royal-canadian-pacific-fundraiser`}
            />
        </Router>
    )
}
function Events({ uri }) {
    return (
        <Router>
            <Feed.EventFeed path="/" />
            <Feed.Post path=":uid" type={EVENT} />
            <Redirect
                from="VvLeBSUAAJgDAgX6"
                to={`${uri}/asa-snowmobile-show-2016`}
            />
            <Redirect
                from="V-r2XyYAACcAblCX"
                to={`${uri}/spin-safety-fundraiser`}
            />
            <Redirect
                from="VEFS_yYAACYARWyK"
                to={`${uri}/thunderstuck-fundraiser-2016`}
            />
            <Redirect
                from="V9bxeiYAACgA9jex"
                to={`${uri}/cardel-homes-movie-ruin-rose`}
            />
            <Redirect
                from="V9By4yYAACgAz0Ni"
                to={`${uri}/agm-save-the-date-2016`}
            />
            <Redirect
                from="V7Sy6ycAACUAo4u_"
                to={`${uri}/bcsnowmobileshow_2016`}
            />
            <Redirect
                from="Vmdqex4AAB0AxBYc"
                to={`${uri}/youth-snow-safety-phoenixmnt-2016`}
            />
            <Redirect
                from="VnCZbR8AAFYKrNgo"
                to={`${uri}/aad-kananaskis-jan-2016`}
            />
            <Redirect
                from="VoQjoR8AADZzIjEZ"
                to={`${uri}/aad-whitewater-jan-2016`}
            />
            <Redirect
                from="VnCX1h8AAFYKrM88"
                to={`${uri}/lake-louise-staying-alive-2016`}
            />
            <Redirect
                from="VliqsR0AAOcTy0Ig"
                to={`${uri}/aad-general-announcement-2016`}
            />
            <Redirect
                from="VpfKah8AAI1FMEHK"
                to={`${uri}/aad-mtseymour-jan-2016`}
            />
            <Redirect
                from="Vpf4ACMAACQAX8yN"
                to={`${uri}/aad-bouldermnt-revelstoke-2016`}
            />
            <Redirect
                from="VsukNiMAACwavKfV"
                to={`${uri}/shreducation-yukon-feb-2016`}
            />
            <Redirect
                from="VmdsER4AAPYJxB90"
                to={`${uri}/aad-lake-louise-2016`}
            />
            <Redirect from="VoQkah8AAEZvIjSt" to={`${uri}/aad-khmr-jan-2016`} />
            <Redirect
                from="VlyuDyUAACUAnMJ-"
                to={`${uri}/baw-fernie-jan-2016`}
            />
            <Redirect
                from="Vo1p7yIAAMcFB2W7"
                to={`${uri}/aad-rossland-jan-2016`}
            />
            <Redirect
                from="VpfMIx8AAKlFMEwl"
                to={`${uri}/aad-crowsnestpass-jan-2016`}
            />
            <Redirect
                from="Vp1xcSYAACUAQUbq"
                to={`${uri}/aad-mtsima-jan-2016`}
            />
            <Redirect
                from="VlywoyUAACQAnNG8"
                to={`${uri}/shreducation-revelstoke-jan-2016`}
            />
            <Redirect
                from="VvHBBCwAAAisDiFM"
                to={`${uri}/avalanche-rescue-challenge-stewart-2016`}
            />
            <Redirect
                from="VvLUTCUAAMEAAc3N"
                to={`${uri}/saskatchewan-snowmobile-show-nov-2016`}
            />
            <Redirect
                from="VnCWSR8AAMoKrMX6"
                to={`${uri}/aad-garibaldi-jan-2016`}
            />
            <Redirect
                from="VpRUhx8AABsHG57y"
                to={`${uri}/aad-kakwa-feb-2016`}
            />
            <Redirect
                from="VpfOKCMAACIAXtdX"
                to={`${uri}/rumrunner-cherrybowl-presentation-2016`}
            />
            <Redirect
                from="VrJnQisAAGMj2Y_U"
                to={`${uri}/ascend-splitboard-fest-2016`}
            />
            <Redirect
                from="VrpuBSgAAEIC5kXJ"
                to={`${uri}/acc-cherrybowl-presentation-2016`}
            />
            <Redirect
                from="VK8DjSMAACUANEm1"
                to={`${uri}/foundation-calgary-fundraiser-2016`}
            />
            <Redirect
                from="VvBrrywAAHOKBjIg"
                to={`${uri}/bcsf-agm-pemberton-2016`}
            />
            <Redirect
                from="VkTj0CAAAB8AKQs5"
                to={`${uri}/staying-alive-khmr-dec-2015`}
            />
            <Redirect
                from="VmdlSR4AAAMNw_cW"
                to={`${uri}/aad-mt-cain-feb-2016`}
            />
            <Redirect
                from="VoQlZx8AAEZvIjpK"
                to={`${uri}/aad-fernie-alpine-resort-2016`}
            />
            <Redirect from="VownoR8AAIinUi2W" to={`${uri}/aad-apex-jan-2016`} />
            <Redirect
                from="VpRSkB8AAOELG5N2"
                to={`${uri}/aad-whistler-jan-2016`}
            />
            <Redirect from="VpmCByMAAFUcaOGm" to={`${uri}/aad-rmr-jan-2016`} />
            <Redirect
                from="VqkoRSQAACUAbEwW"
                to={`${uri}/youth-sled-day-revelstoke-2016`}
            />
            <Redirect
                from="VvLCACUAAMEAAWBL"
                to={`${uri}/avcan-agm-vancouver-fall-2016`}
            />
            <Redirect
                from="VyE6eiYAAJURUa72"
                to={`${uri}/caa-spring-conference-case-studies-2016`}
            />
            <Redirect
                from="VvF1CSwAAGKgDF2C"
                to={`${uri}/issw-2016-breckenridge`}
            />
            <Redirect
                from="Vmdhxx4AAAQNw-Jb"
                to={`${uri}/aad-banff-jan-2016`}
            />
            <Redirect from="Vqfpwh4AACMAso45" to={`${uri}/aad-smithers-2016`} />
            <Redirect
                from="VvB06CwAAIqKBmhf"
                to={`${uri}/isc-2016-snowmobile`}
            />
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
            <StaticPage path=":uid" />
        </Router>
    )
}
function GenericPages() {
    return (
        <Router>
            <Redirect from="privacy-policy" to="/privacy-policy" />
            <Redirect from="terms-of-use" to="/terms-of-use" />
            <GenericPage path=":uid" />
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
