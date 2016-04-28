import React, { PropTypes } from 'react'
import { compose, withContext, withState } from 'recompose'
import Loop from '../../weather/Loop'
import Page from '../Page'
import Aside from '../Aside'
import Article from '../Article'
import Sidebar from './Sidebar'
import FAQ from './FAQ'
import Forecast from './Forecast'
import { Fetch } from '../../prismic'

const links = new Map([
    ['forecast', {
        label: 'Forecast',
        component: <Forecast />
    }],
    ['faq', {
        label: 'FAQ',
        title: 'FAQ',
        component: <FAQ />
    }],
    ['1-hour-precipitation', {
        label: '1 hour precipitation',
        title: '1 hour precipitation',
        component: <Loop type='AC_HRDPS_BC_wms-1hr-precip' />
    }],
    ['3-hour-precipitation', {
        label: '3 hour precipitation',
        title: '3 hour precipitation',
        component: <Loop type='AC_RDPS_BC_3hr-precip' />
    }],
    ['12-hour-precipitation', {
        label: '12 hour precipitation',
        title: '12 hour precipitation',
        component: <Loop type='AC_RDPS_BC_12hr-precip' />
    }],
    ['1500-metres-temperatures', {
        label: '1500 metres temperatures',
        title: '1500 metres temperatures',
        component: <Loop type='AC_GDPS_BC_1500m-temp' />
    }],
    ['2500-metres-winds', {
        label: '2500 metres winds',
        title: '2500 metres winds',
        component: <Loop type='AC_GDPS_BC_2500m-wind' />
    }],
    ['radar-imagery', {
        label: 'Radar imagery',
        title: 'Radar imagery',
        component: <p>Coming soon!</p>
    }],
])

function Root({ path, onPathChange }) {
    const { component, title } = links.get(path)

    return (
        <Page title='Mountain Weather'>
            <Article>
                {title && <h2>{title}</h2>}
                {component}
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
