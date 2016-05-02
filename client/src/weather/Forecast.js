import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import { withContext } from 'recompose'
import DaySet from './DaySet'
import TabSet from './TabSet'
import Outlook from './Outlook'
import { Text, Html } from '../prismic'
import styles from './Forecast.css'

Forecast.propTypes = {
    document: PropTypes.object.isRequired,
}

function Forecast({ document }) {
    const date = document.getDate(`${document.type}.date`)
    const headline = document.getText(`${document.type}.headline`)
    const isOld = document.get(`${document.type}.content-1-2`) === null

	return (
		<section styleName='Container'>
            <h2 styleName='Headline'>{headline}</h2>
			{isOld && <Html document={document} fragment={`${document.type}.synopsis`} />}
            <TabSet forecast={document} />
			<DaySet start={date} forecast={document} />
			<Outlook forecast={document} />
		</section>
	)
}

export default CSSModules(Forecast, styles)
