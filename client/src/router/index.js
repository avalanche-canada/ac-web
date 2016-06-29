import React, {DOM} from 'react'
import {Router, Route, IndexRoute, IndexRedirect, browserHistory, applyRouterMiddleware} from 'react-router'
import useScroll from 'react-router-scroll'
import {Root, Map, About, Events, Event, Sponsors, NewsFeed, NewsPost, Blog, BlogPost, Ast, Weather, PrivacyPolicy, TermsOfUse, Forecast} from 'containers'
import {generic} from 'containers/compose'
import {NotFound} from 'pages'
import * as articles from 'pages/weather/articles'
import {AvalancheCanadaFoundation} from 'containers/Navbar'

function handleEnterForecastRoute(props) {
    console.log('try to fly to', props.params.name)
}

export default (
    <Router history={browserHistory} render={applyRouterMiddleware(useScroll())} >
        <Route path='/' component={Root}>
            {/*AVALANCHE CANADA*/}
            <IndexRedirect to='map' />
            <Route path='map' components={{content: Map, footer: null}}>
                <Route path='forecasts/:name' component={Forecast} onEnter={handleEnterForecastRoute} />
            </Route>
            <Route path='about' component={About} />
            <Route path='events' component={Events} />
            <Route path='events/:uid' component={Event} />
            <Route path='news' component={NewsFeed} />
            <Route path='news/:uid' component={NewsPost} />
            <Route path='blogs' component={Blog} />
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
            <Route path='ast(/:type)' component={Ast} />
            <Route path='login' onEnter={::console.log} onLeave={::console.log} />
            <Route path='logout' onEnter={::console.log} onLeave={::console.log} />
            <Route path='terms-of-use' component={TermsOfUse} />
            <Route path='privacy-policy' component={PrivacyPolicy} />
            {/*AVALANCHE CANADA FOUNDATION*/}
            <Route path='foundation' components={{navbar: AvalancheCanadaFoundation, content: About}}>
                {/*MORE FOUNDATION PAGES*/}
            </Route>
            {/*FALLBACK*/}
            <Route path='*' component={NotFound} />
        </Route>
    </Router>
)

export const history = browserHistory
