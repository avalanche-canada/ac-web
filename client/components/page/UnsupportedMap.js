import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import CSSModules from 'react-css-modules'
import Error from './Error'
import Main from './Main'
import Headline from './Headline'
import Section from './Section'
import { Mailto, Loading } from '~/components/misc'
import styles from './Page.css'
import mapbox from '~/services/mapbox/map'

UnsupportedMap.propTypes = {
    forecastRegions: PropTypes.array,
    hotZones: PropTypes.array,
}

function UnsupportedMap({ forecastRegions, hotZones }) {
    return (
        <Error styleName="UnsupportedMap">
            <Main>
                <h1>Uh oh! You never thought that would happen...</h1>
                <Headline>
                    It seems that your browser does not support the technology required (WebGL for the geeks) to show forecasts, hot zones and other avalanche-related information on our map.
                    We suggest you
                    {' '}
                    <a href="//outdatedbrowser.com" target="_blank">
                        update your browser
                    </a>
                    {' '}
                    and make sure that WebGL is
                    {' '}
                    <a href="//get.webgl.org/" target="_blank">enabled</a>
                    .
                </Headline>
                <div styleName="UnsupportedMap--Links">
                    <Section title="Forecast Regions">
                        {forecastRegions.isEmpty()
                            ? <Loading />
                            : <ul>
                                  {forecastRegions.map(region => (
                                      <li>
                                          <Link
                                              to={`forecasts/${region.get('id')}`}>
                                              {region.get('name')}
                                          </Link>
                                      </li>
                                  ))}
                              </ul>}
                    </Section>
                    <Section title="Hot Zones">
                        {hotZones.isEmpty()
                            ? <Loading />
                            : <ul>
                                  {hotZones.map(zone => (
                                      <li>
                                          <Link
                                              to={`hot-zone-reports/${zone.get('id')}`}>
                                              {zone.get('name')}
                                          </Link>
                                      </li>
                                  ))}
                              </ul>}
                    </Section>
                </div>
                <Headline>
                    If you need help or have questions, do not hesitate to send us an
                    {' '}
                    <Mailto
                        email="kguillotte@avalanche.ca,wharding@avalanche.ca"
                        subject="Unsupported map"
                        body={`\n\n\nMapBox GL supported: ${mapbox.supported()}\nNavigator: ${navigator.userAgent}`}>
                        email
                    </Mailto>.
                </Headline>
            </Main>
        </Error>
    )
}

export default CSSModules(UnsupportedMap, styles)
