import React from 'react'
import {Route, IndexRoute, IndexRedirect} from 'react-router'
import {loadForType, loadForBookmark} from 'actions/prismic'
import {
    Root,
    Map,
    About,
    Events,
    Event,
    Sponsors,
    Collaborators,
    Ambassadors,
    NewsFeed,
    NewsPost,
    BlogFeed,
    BlogPost,
    EventFeed,
    EventPost,
    Ast,
    Weather,
    PrivacyPolicy,
    TermsOfUse,
    Forecast,
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
} from 'containers'
import {NotFound} from 'components/page'
import * as articles from 'components/page/weather/articles'
import {AvalancheCanadaFoundation} from 'containers/Navbar'

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

        query.year = String(new Date().getFullYear())

        replace({...location, query})
    }

    return (
        <Route path='/' component={Root} onEnter={handleRootRouteEntered} >
            {/*AVALANCHE CANADA*/}
            <IndexRedirect to='map' />
            <Route path='map' components={{content: Map, footer: null}}>
                <Route path='forecasts'>
                    <Route path=':name' components={{primary: Forecast}} />
                </Route>
                <Route path='hot-zone-reports'>
                    <Route path=':name' components={{primary: HotZoneReport}} />
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
            <Route path='training' component={Training} />
            <Route path='training/:type' component={Ast} />
            <Route path='tutorial' component={Tutorial} />
            <Route path='youth' component={Youth} />
            <Route path='gear' component={Gear} />
            <Route path='sled' component={Sled} />
            <Route path='auction' component={Auction} />
            <Route path='terms-of-use' component={TermsOfUse} />
            <Route path='privacy-policy' component={PrivacyPolicy} />
            {/*AUTHENTIFICATION*/}
            <Route path='login' onEnter={::console.log} onLeave={::console.log} />
            <Route path='logout' onEnter={::console.log} onLeave={::console.log} />
            {/*AVALANCHE CANADA FOUNDATION*/}
            <Route path='foundation' components={{navbar: AvalancheCanadaFoundation, content: About}}>
                {/*MORE FOUNDATION PAGES*/}
            </Route>
            {/*FALLBACK*/}
            <Route path='*' component={NotFound} />
        </Route>
    )
}
