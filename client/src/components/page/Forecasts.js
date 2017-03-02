import React from 'react'
import {Link} from 'react-router'
import CSSModules from 'react-css-modules'
import Page from './Page'
import Header from './Header'
import Main from './Main'
import Content from './Content'
import Headline from './Headline'
import Section from './Section'
import {Loading} from 'components/misc'
import styles from './Page.css'
import mapbox from 'services/mapbox/map'

function Forecasts({forecastRegions}) {
    return (
        <Page styleName='Forecasts'>
            <Header title='Forecast regions' />
            <Content>
                <Main>
                    <Section>
                        <Headline>
                            Click on a link below to read the avalanche bulletin.
                        </Headline>
                        {forecastRegions.isEmpty() ?
                            <Loading /> :
                            <ul>
                            {forecastRegions.map(region => (
                                <li key={region.get('id')}>
                                    <Link to={`forecasts/${region.get('id')}`}>
                                        {region.get('name')}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        }
                    </Section>
                </Main>
            </Content>
        </Page>
    )
}

export default CSSModules(Forecasts, styles)
