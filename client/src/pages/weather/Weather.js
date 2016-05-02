import React, { PropTypes } from 'react'
import { withState } from 'recompose'
import Loop from '../../weather/Loop'
import Page from '../Page'
import Article from '../Article'
import ArticleHeader from '../ArticleHeader'
import Aside from '../Aside'
import Sidebar from './Sidebar'
import Footer from './Footer'
import Forecast from './articles/Forecast'
import FAQ from './articles/FAQ'
import MSLP from './articles/MSLP'
import Precipitation12h from './articles/Precipitation12h'
import Precipitation from './articles/Precipitation'
import Temperatures from './articles/Temperatures'
import Winds from './articles/Winds'
import Radar from './articles/Radar'
import Satellite from './articles/Satellite'
import RealTime from './articles/RealTime'
import { Fetch } from '../../prismic'

const articles = new Map([
    ['forecast', {
        label: 'Day 1-10 Forecasts',
        article: <Forecast />
    }],
    ['precipitation-hourly', {
        title: 'Precipitation',
        label: 'Precipitation',
        article: <Precipitation />
    }],
    ['precipitation-12h', {
        title: 'Precipitation 12h Totals',
        label: 'Precipitation 12h',
        article: <Precipitation12h />
    }],
    ['temperatures', {
        title: 'Temperatures',
        label: 'Temperatures',
        article: <Temperatures />
    }],
    ['winds', {
        title: 'Winds',
        label: 'Winds',
        article: <Winds />
    }],
    ['mslp', {
        title: 'Mean Sea Level Pressure (MSLP)',
        label: 'MSLP',
        article: <MSLP />
    }],
    ['radar', {
        title: 'Radar Imagery',
        label: 'Radar',
        article: <Radar />
    }],
    ['satellite', {
        title: 'Satellite Imagery',
        label: 'Satellite',
        article: <Satellite />
    }],
    ['real-time', {
        title: 'Real Time Weather',
        label: 'Real Time',
        article: <RealTime />
    }],
    ['faq', {
        title: 'Frequently Asksed Questions (FAQs)',
        label: 'FAQs',
        article: <FAQ />
    }],
])

function K() {}

Weather.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
}

function Weather({ path, onPathChange, isAuthenticated = false }) {
    const { article, title } = articles.get(path)

    return (
        <Page title='Mountain Weather'>
            <Article>
                {!!title && <ArticleHeader>{title}</ArticleHeader>}
                {article}
            </Article>
            <Aside>
                <Sidebar {...{articles, onPathChange}} />
            </Aside>
            <Footer showFeedbackAnchor={isAuthenticated} />
        </Page>
    )
}

export default withState('path', 'onPathChange', 'forecast')(Weather)
