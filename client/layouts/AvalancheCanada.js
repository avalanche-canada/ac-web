import React from 'react'
import { memo } from 'utils/react'
import { Router, Redirect } from '@reach/router'
import { FormattedMessage } from 'react-intl'
import LoginComplete from './LoginComplete'
import Account from './Account'
import Main from 'layouts/main'
import Tutorial from './tutorial'
import Ast from './ast'
import MountainInformationNetwork from './MountainInformationNetwork'
import Weather from './weather'
import HotZoneReport from './HotZoneReport'
import Incidents from './incidents'
import Forecast from './Forecast'
import TripPlanner from './TripPlanner'
import Admin from './admin'
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
import * as min from 'utils/min'
import { Page as SPAW } from './SPAW'
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
                        <SPAW path="spaw/*" />
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
                        <Account path="account" />
                        <Admin path="admin/*" />
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
                        <Redirect from="/submit" to={min.path('submit')} />
                        <Weather path="weather/*" />
                        <Ast path="training/*" />
                        <StaticPage path="careers" uid="careers" />
                        <StaticPage path="start-here" uid="start-here" />
                        <StaticPage path="about" uid="about" />
                        <StaticPage path="dangerator" uid="dangerator" />
                        <StaticPage path="mobile" uid="mobile" />
                        <StaticPage
                            path="early-season-conditions"
                            uid="early-season-conditions"
                        />
                        <TripPlanner path="planning/trip-planner" />
                        <StaticPage
                            path="planning/decision-making"
                            uid="decision-making"
                        />
                        <StaticPage path="planning" uid="planning" />
                        <StaticPage path="information" uid="information" />
                        <StaticPage
                            path="sled"
                            uid="sled"
                            className={styles.Sled}
                        />
                        <StaticPage path="youth" uid="youth" />
                        <StaticPage path="gear" uid="essential-gear" />
                        <StaticPage path="training" uid="training" />
                        <StaticPage
                            path="training/companion-rescue"
                            uid="companion-rescue"
                        />
                        <StaticPage path="education" uid="education" />
                        <StaticPage
                            path="education/recorded-webinars"
                            uid="webinar-recordings"
                        />
                        <StaticPage
                            path="instructing-ast"
                            uid="instructing-ast"
                        />
                        <StaticPage
                            path="ambassadors"
                            uid="ambassadors"
                            className={styles.Ambassadors}
                        />
                        <StaticPage path="sponsors" uid="sponsors" />
                        <StaticPage path="collaborators" uid="collaborators" />
                        <StaticPage path="inreach" uid="inreach" />
                        <StaticPage
                            path="privacy-policy"
                            uid="privacy-policy"
                        />
                        <GenericPage path="terms-of-use" uid="terms-of-use" />
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
                    <FormattedMessage
                        id="forecasts"
                        defaultMessage="Forecasts"
                    />
                </a>
                <a href="/training" className={layouts.Link}>
                    <FormattedMessage id="training" defaultMessage="Training" />
                </a>
                <a href="/news" className={layouts.Link}>
                    <FormattedMessage
                        id="latest-news"
                        defaultMessage="Latest news"
                    />
                </a>
                <a href="/events" className={layouts.Link}>
                    <FormattedMessage
                        id="upcoming-events"
                        defaultMessage="Upcoming events"
                    />
                </a>
                <a href="/blogs" className={layouts.Link}>
                    <FormattedMessage id="our-blog" defaultMessage="Our blog" />
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
            <Redirect from="companion-rescue" to="/training/companion-rescue" />
            <Redirect from="education" to="/education" />
            <Redirect from="careers" to="/careers" />
            <Redirect from="planning" to="/planning" />
            <Redirect from="decision-making" to="/planning/decision-making" />
            <Redirect from="sled" to="/sled" />
            <Redirect from="youth" to="/youth" />
            <Redirect from="essential-gear" to="/gear" />
            <Redirect from="training" to="/training" />
            <Redirect
                from="mountain-information-network-overview"
                to={min.path()}
            />
            <Redirect
                from="mountain-information-network-submission-guidelines"
                to={min.path('submission-guidelines')}
            />
            <Redirect from="about" to="/about" />
            <Redirect
                from="mountain-information-network-faq"
                to={min.path('faq')}
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
            <Redirect from="submissions/:id" to={min.submission(':id')} />
            <Redirect from=":page" to={min.path(':page')} />
            <Redirect from="/" to={min.path()} />
        </Router>
    )
}
