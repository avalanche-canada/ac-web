import React from 'react'
import { memo } from 'utils/react'
import { Router, Redirect } from '@reach/router'
import LoginComplete from './LoginComplete'
import Main from 'layouts/main'
import Tutorial from './tutorial'
import Ast from './ast'
import MountainInformationNetwork from './MountainInformationNetwork'
import Weather from './weather'
import HotZoneReport from './HotZoneReport'
import Incidents from './incidents'
import Forecast from './Forecast'
import TripPlanner from './TripPlanner'
import * as Feed from './feed'
import Glossary from 'layouts/glossary'
import { Boundary as ErrorBoundary } from 'components/error'
import { NotFound, Fallback } from 'layouts/pages'
import { ButtonSet } from 'components/button'
import { Provider as SponsorsMetadataProvider } from 'contexts/sponsors'
import { Provider as AuthProvider } from 'contexts/auth'
import { StaticPage, GenericPage } from 'prismic/layouts'
import { GENERIC, STATIC_PAGE } from 'constants/prismic'
import { NEWS, BLOG, EVENT } from 'constants/prismic'
import { path } from 'utils/min'
import layouts from 'layouts/pages/pages.css'
import styles from './AvalancheCanada.css'

function AvalancheCanada() {
    return (
        <AuthProvider>
            <SponsorsMetadataProvider>
                <ErrorBoundary fallback={<AvCanFallback />}>
                    {/* FIXME: Make it primary. With primary clicking a region on the map make the map jumping. */}
                    <Router primary={false}>
                        <Main path="/" />
                        <Main path="map/*" />
                        <Redirect from="/cac/*" to="/" />
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
                        <Glossary path="glossary/*" />
                        <Redirect
                            from="pages/tutorial/tutorial"
                            to="/tutorial"
                        />
                        <Tutorial path="tutorial/*" />
                        <Tutorial path="tutoriel/*" />
                        <Redirect from="hot-zone-reports/*" to="advisories" />
                        <Redirect from="hot-zones/*" to="advisories" />
                        <HotZoneReport path="advisories/*" />
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
                        <StaticPage path="careers" uid="careers" />
                        <StaticPage
                            path="start-here"
                            uid="start-here"
                            title="Start here"
                        />
                        <StaticPage path="about" uid="about" title="About" />
                        <StaticPage
                            path="dangerator"
                            uid="dangerator"
                            title="Dangerator"
                        />
                        <StaticPage path="mobile" uid="mobile" title="Mobile" />
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
                            className={styles.Sled}
                        />
                        <StaticPage path="youth" uid="youth" title="Youth" />
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
                            className={styles.Ambassadors}
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
                        <NotFound default />
                    </Router>
                </ErrorBoundary>
            </SponsorsMetadataProvider>
        </AuthProvider>
    )
}

export default memo.static(AvalancheCanada)

// TODO Move that component
function AvCanFallback(props) {
    return (
        <Fallback {...props}>
            <ButtonSet>
                <a href="/" className={layouts.Link}>
                    Forecasts
                </a>
                <a href="/training" className={layouts.Link}>
                    Training
                </a>
                <a href="/news" className={layouts.Link}>
                    Latest news
                </a>
                <a href="/events" className={layouts.Link}>
                    Upcoming events
                </a>
                <a href="/blogs" className={layouts.Link}>
                    Our blog
                </a>
            </ButtonSet>
        </Fallback>
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
function News() {
    return (
        <Router>
            <Feed.NewsFeed path="/" />
            <Feed.Post path=":uid" type={NEWS} />
        </Router>
    )
}
function Events() {
    return (
        <Router>
            <Feed.EventFeed path="/" />
            <Feed.Post path=":uid" type={EVENT} />
        </Router>
    )
}
function Pages() {
    return (
        <Router>
            <Redirect from="/definition/:uid" to="/glossary/terms/:uid" />
            <Redirect from="/blog/:uid" to="/blogs/:uid" />
            <StaticPagePages path={`${STATIC_PAGE}/*`} />
            <GenericPages path={`${GENERIC}/*`} />
        </Router>
    )
}
function StaticPagePages() {
    return (
        <Router>
            <Redirect from="careers" to="/careers" />
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
            <Redirect from="submissions/:id" to={path(':id')} />
            <Redirect from=":page" to="/mountain-information-network/:page" />
            <Redirect from="/" to="/mountain-information-network" />
        </Router>
    )
}
