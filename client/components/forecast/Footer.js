import React from 'react'
import PropTypes from 'prop-types'
import StaticComponent from 'components/StaticComponent'
import Panel, { INVERSE } from 'components/panel'
import RatingExplanation from 'components/forecast/RatingExplanation'
import { Generic } from 'prismic/components'
import ArchiveDatePicker from './ArchiveDatePicker'
import styles from './Forecast.css'

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
            <FooterPanel header="Archived bulletins">
                <ArchiveDatePicker date={date} region={region} />
            </FooterPanel>
        )
    }
}

export class DangerRatings extends StaticComponent {
    render() {
        return (
            <FooterPanel header="Danger Ratings Explained">
                <RatingExplanation />
            </FooterPanel>
        )
    }
}

export class Inbox extends StaticComponent {
    render() {
        return (
            <FooterPanel header="Avalanche Forecasts in your Inbox">
                <div className={styles.PanelContent}>
                    <Generic uid="forecast-rss-message" />
                </div>
            </FooterPanel>
        )
    }
}

export class Disclaimer extends StaticComponent {
    render() {
        return (
            <FooterPanel header="Forecast Disclaimer">
                <div className={styles.PanelContent}>
                    <Generic uid="forecast-disclaimer" />
                </div>
            </FooterPanel>
        )
    }
}

// Utils
function FooterPanel({ header, children }) {
    return (
        <Panel theme={INVERSE} expandable header={header}>
            {children}
        </Panel>
    )
}
