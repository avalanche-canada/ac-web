import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Error, Main, Headline } from 'components/page'
import { Mailto } from 'components/anchors'
import mapbox from 'services/mapbox/map'
import { ButtonSet } from 'components/button'
import styles from 'components/page/Page.css'

export default class UnsupportedMap extends PureComponent {
    static propTypes = {
        links: PropTypes.instanceOf(Map),
    }
    static defaultProps = {
        links: new Map([
            ['/forecasts', 'Forecast regions'],
            ['/hot-zones', 'Hot zones'],
            ['/weather/stations', 'Weather stations'],
        ]),
    }
    render() {
        const { links } = this.props

        return (
            <Error>
                <Main>
                    <h1>Uh oh! You never thought that would happen...</h1>
                    <Headline>
                        It seems that your browser does not support the
                        technology required (WebGL for the geeks) to show
                        forecasts, hot zones and other avalanche-related
                        information on our map. We suggest you{' '}
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
                        {Array.from(links).map(([link, text]) => (
                            <Link key={link} className={styles.Link} to={link}>
                                {text}
                            </Link>
                        ))}
                    </ButtonSet>
                    <Headline>
                        If you need help or have questions, do not hesitate to
                        send us an{' '}
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
}
