import React from 'react'
import PropTypes from 'prop-types'
import Panel from 'components/panel'
import RatingExplanation from 'components/forecast/RatingExplanation'
import { Generic } from 'prismic/components'
import styles from './Forecast.css'
import ArchiveDatePicker from './ArchiveDatePicker'
import StaticComponent from 'components/StaticComponent'

export default class Footer extends StaticComponent {
    static propTypes = {
        children: PropTypes.node,
    }
    get children() {
        return [
            <ArchivedBulletins />,
            <DangerRatings />,
            <Inbox />,
            <Disclaimer />,
        ]
    }
    render() {
        return (
            <footer className={styles.Footer}>
                {this.props.children || this.children}
            </footer>
        )
    }
}

export class ArchivedBulletins extends StaticComponent {
    static propTypes = {
        date: PropTypes.instanceOf(Date),
        region: PropTypes.string.isRequired,
    }
    static defaultProps = {
        date: new Date(),
    }
    render() {
        const { date, region } = this.props

        return (
            <Panel expandable header="Archived bulletins">
                <ArchiveDatePicker date={date} region={region} />
            </Panel>
        )
    }
}

export class DangerRatings extends StaticComponent {
    render() {
        return (
            <Panel expandable header="Danger Ratings Explained">
                <RatingExplanation />
            </Panel>
        )
    }
}

export class Inbox extends StaticComponent {
    render() {
        return (
            <Panel expandable header="Avalanche Forecasts in your Inbox">
                <Generic uid="forecast-rss-message" />
            </Panel>
        )
    }
}

export class Disclaimer extends StaticComponent {
    render() {
        return (
            <Panel expandable header="Forecast Disclaimer">
                <Generic uid="forecast-disclaimer" />
            </Panel>
        )
    }
}
