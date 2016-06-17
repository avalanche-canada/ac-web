import React, {DOM} from 'react'
import {Router, Route, IndexRoute, IndexRedirect, browserHistory, applyRouterMiddleware} from 'react-router'
import useScroll from 'react-router-scroll'
import {App, Map, About, Events, Event, Sponsors, NewsFeed, NewsEntry, Blog, BlogPost, Ast, Weather} from 'containers'
import {NotFound} from 'pages'
import * as articles from 'pages/weather/articles'

export default (
    <Router history={browserHistory} render={applyRouterMiddleware(useScroll())} onUpdate={::console.log}>
        <Route path='/' components={App}>
            <IndexRoute component={Map} />
            <Route path='about' component={About} />
            <Route path='events' component={Events}>
                <Route path=':id' component={Event} />
            </Route>
            <Route path='news' component={NewsFeed}>
                <Route path=':id' component={NewsEntry} />
            </Route>
            <Route path='blogs' component={Blog}>
                <Route path=':id' component={BlogPost} />
            </Route>
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
            <Route path='*' component={NotFound} />
        </Route>
        <Route path='foundation' component={App}>
            <IndexRoute component={null} />
            <Route path='*' component={NotFound} />
        </Route>
    </Router>
)

export const history = browserHistory
