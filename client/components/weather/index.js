import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import styles from './Forecast.css'
import Forecast from './Forecast'
import Legacy from './Legacy'

export Loop from './Loop'
export Image from '~/components/loop'

Container.propTypes = {
    forecast: PropTypes.object.isRequired,
}

function Container(props) {
    const { forecast } = props

    return (
        <section styleName="Container">
            <h2 styleName="Headline">{forecast.headline}</h2>
            {forecast.isLegacy
                ? <Legacy forecast={forecast} />
                : <Forecast {...props} />}
        </section>
    )
}

export default CSSModules(Container, styles)
