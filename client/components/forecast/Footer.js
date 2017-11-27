import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Panel from 'components/panel'
import RatingExplanation from 'components/forecast/RatingExplanation'
import { Generic } from 'prismic/components'
import styles from './Forecast.css'
import ArchiveDatePicker from './ArchiveDatePicker'

export default class Footer extends Component {
    static propTypes = {
        date: PropTypes.instanceOf(Date).isRequired,
        region: PropTypes.string.isRequired,
    }
    shouldComponentUpdate() {
        return false
    }
    render() {
        const { date = new Date(), region } = this.props

        return (
            <footer className={styles.Footer}>
                <Panel expandable header="Archived bulletins">
                    <ArchiveDatePicker date={date} region={region} />
                </Panel>
                <Panel expandable header="Danger Ratings Explained">
                    <RatingExplanation />
                </Panel>
                <Panel expandable header="Avalanche Forecasts in your Inbox">
                    <Generic uid="forecast-rss-message" />
                </Panel>
                <Panel expandable header="Forecast Disclaimer">
                    <Generic uid="forecast-disclaimer" />
                </Panel>
            </footer>
        )
    }
}
