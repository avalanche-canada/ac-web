import React from 'react'
import { Link } from 'react-router-dom'
import { Error, Main, Headline } from 'components/page'
import { Mailto } from 'components/anchors'
import mapbox from 'services/mapbox/map'
import { ButtonSet } from 'components/button'
import styles from 'components/page/Page.css'

export default function UnsupportedMap() {
    return (
        <Error>
            <Main>
                <h1>Uh oh! You never thought that would happen...</h1>
                <Headline>
                    It seems that your browser does not support the technology
                    required (WebGL for the geeks) to show forecasts, hot zones
                    and other avalanche-related information on our map. We
                    suggest you{' '}
                    <a href="//outdatedbrowser.com" target="_blank">
                        update your browser
                    </a>{' '}
                    and make sure that WebGL is{' '}
                    <a href="//get.webgl.org/" target="_blank">
                        enabled
                    </a>
                    .
                </Headline>
                <ButtonSet>
                    <Link className={styles.Link} to="/forecasts">
                        Forecast regions
                    </Link>
                    <Link className={styles.Link} to="/hot-zones">
                        Hot zones
                    </Link>
                    <Link className={styles.Link} to="/weather/stations">
                        Weather stations
                    </Link>
                </ButtonSet>
                <Headline>
                    If you need help or have questions, do not hesitate to send
                    us an{' '}
                    <Mailto
                        email="kguillotte@avalanche.ca,wharding@avalanche.ca"
                        subject="Unsupported map"
                        body={`\n\n\nMapBox GL supported: ${mapbox.supported()}\nNavigator: ${
                            navigator.userAgent
                        }`}>
                        email
                    </Mailto>.
                </Headline>
            </Main>
        </Error>
    )
}
