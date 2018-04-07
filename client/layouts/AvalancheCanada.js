import React, { Component } from 'react'
import Application from 'components/application'
import { Link, Route, Redirect, Switch } from 'react-router-dom'
import {
    LoginCompleteRoute,
    NotFoundRoute,
    StaticPageRoute,
    GenricPageRoute,
    WIPPageRoute,
    FallbackPageRoute,
} from 'router/common'
import Navbar from './Navbar'
import SPAW from './SPAW'
import Highlight from './Highlight'
import Footer from 'components/footer'
import Main from './Map'
import Tutorial from './Tutorial'
import Ast from './Ast'
import MountainInformationNetwork from './MountainInformationNetwork'
import Weather from './weather'
import HotZoneReport from './HotZoneReport'
import HotZoneList from './HotZoneList'
import Forecast from './Forecast'
import TripPlanner from './TripPlanner'
import * as Feed from './feed'
import Glossary from 'containers/Glossary'
import ErrorBoundary from 'components/ErrorBoundary'
import { Error } from 'components/text'
import * as Page from 'components/page'
import { ButtonSet } from 'components/button'
import styles from 'components/page/Page.css'

export default class AvalancheCanada extends Component {
    children = ({ hasError, error }) => {
        if (hasError) {
            return (
                <Page.Error>
                    <Page.Main>
                        <h1>Uh oh! We never thought that would happen...</h1>
                        <Page.Headline>
                            An error happened on a page you tried to visit.
                            <Error>{error.message}</Error>
                        </Page.Headline>
                        <ButtonSet>
                            <Link to="/" className={styles.Link}>
                                Forecasts
                            </Link>
                            <Link to="/training" className={styles.Link}>
                                Training
                            </Link>
                            <Link to="/news" className={styles.Link}>
                                Latest news
                            </Link>
                            <Link to="/events" className={styles.Link}>
                                Upcoming events
                            </Link>
                            <Link to="/blogs" className={styles.Link}>
                                Our blog
                            </Link>
                        </ButtonSet>
                    </Page.Main>
                </Page.Error>
            )
        }

        return (
            <Switch>
                <Redirect exact from="/" to="/map" />
                <LoginCompleteRoute path="/login-complete" />
                <Route path="/map/:type?/:name?" component={Main} />
                <Route path="/glossary" component={Glossary} />
                <Route path="/tutorial" component={Tutorial} />
                <Route path="/hot-zone-reports" component={HotZoneReport} />
                <Route path="/hot-zones" component={HotZoneList} />
                <Route path="/forecasts" component={Forecast} />
                <Route path="/blogs/:uid" component={Feed.BlogPost} />
                <Route path="/blogs" component={Feed.BlogFeed} />
                <Route path="/news/:uid" component={Feed.NewsPost} />
                <Route path="/news" component={Feed.NewsFeed} />
                <Route path="/events/:uid" component={Feed.EventPost} />
                <Route path="/events" component={Feed.EventFeed} />
                <Route
                    path="/mountain-information-network"
                    component={MountainInformationNetwork}
                />
                <Route path="/weather" component={Weather} />
                <Route path="/training/:type" component={Ast} />
                <StaticPageRoute path="/about" uid="about" title="About" />
                <StaticPageRoute
                    path="/early-season-conditions"
                    uid="early-season-conditions"
                    title="Early Season Conditions"
                />
                <StaticPageRoute path="/tech" uid="tech" title="Tech" />
                <StaticPageRoute path="/faq" uid="faq" title="FAQ" />
                <Route path="/planning/trip-planner" component={TripPlanner} />
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
                <StaticPageRoute path="/sled" uid="sled" title="Sled" />
                <StaticPageRoute path="/youth" uid="youth" title="Youth" />
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
                    title="Go Farther — Get Avalanche Educated"
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
                <GenricPageRoute
                    path="/privacy-policy"
                    uid="privacy-policy"
                    title="Privacy Policy"
                />
                <GenricPageRoute
                    path="/terms-of-use"
                    uid="terms-of-use"
                    title="Terms of use"
                />
                <WIPPageRoute
                    path="/incidents"
                    name="Historic Incidents"
                    oldUrl="http://old.avalanche.ca/cac/library/incident-report-database/view"
                />
                <WIPPageRoute
                    path="/tutoriel"
                    name="Tutorial / Tutoriel"
                    oldUrl="http://old.avalanche.ca/fr/cac/training/online-course"
                    title={defaultTitle =>
                        `${defaultTitle}<br />Nous travaillons présentement sur cette page...`
                    }
                    subtitle={defaultSubtitle =>
                        `${defaultSubtitle}<br />Pour l'instant, vous pouvez consulter cette page sur notre ancien site.`
                    }
                />
                <FallbackPageRoute path="/pages/:type/:uid" />
                <NotFoundRoute />
            </Switch>
        )
    }
    render() {
        return (
            <Application>
                <Navbar />
                <SPAW />
                <Highlight />
                <ErrorBoundary>{this.children}</ErrorBoundary>
                <Switch>
                    <Route path="/map" component={null} />
                    <Route path="/planning/trip-planner" component={null} />
                    <Route path="/incidents" component={null} />
                    <Route path="/tutoriel" component={null} />
                    <Route component={Footer} />
                </Switch>
            </Application>
        )
    }
}
