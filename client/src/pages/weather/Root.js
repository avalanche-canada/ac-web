import React, { PropTypes } from 'react'
import { compose, withContext, withState } from 'recompose'
import Loop from '../../weather/Loop'
import Page from '../Page'
import Article from '../Article'
import Aside from '../Aside'
import Sidebar from './Sidebar'
import Forecast from './articles/Forecast'
import FAQ from './articles/FAQ'
import MSLP from './articles/MSLP'
import Precipitations from './articles/Precipitations'
import Temperatures from './articles/Temperatures'
import Winds from './articles/Winds'
import Radar from './articles/Radar'
import Satellite from './articles/Satellite'
import Warnings from './articles/Warnings'
import { Fetch } from '../../prismic'

const links = new Map([
    ['forecast', {
        label: 'Forecast',
        article: <Forecast />
    }],
    ['faq', {
        label: 'FAQ',
        article: <FAQ />
    }],
    ['precipitations', {
        label: 'Precipitations',
        article: <Precipitations />
    }],
    ['temperatures', {
        label: 'Temperature aloft',
        article: <Temperatures />
    }],
    ['winds', {
        label: 'Winds aloft',
        article: <Winds />
    }],
    ['mslp', {
        label: 'MSLP',
        article: <MSLP />
    }],
    ['radar', {
        label: 'Radar',
        article: <Radar />
    }],
    ['satellite', {
        label: 'Satellite',
        article: <Satellite />
    }],
    ['warnings', {
        label: 'Warnings',
        article: <Warnings />
    }],
])

function Root({ path, onPathChange }) {
    const { article } = links.get(path)

    return (
        <Page title='Mountain Weather'>
            <Article>
                {article}
            </Article>
            <Aside>
                <Sidebar {...{links, onPathChange}} />
            </Aside>
        </Page>
    )
}

const childContextTypes = {
    isAuthenticated: PropTypes.bool,
}

function getChildContext(props) {
    return props
}

export default compose(
    withContext(childContextTypes, getChildContext),
    withState('path', 'onPathChange', 'forecast'),
)(Root)
