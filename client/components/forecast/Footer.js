import React, { Fragment, Children, cloneElement } from 'react'
import PropTypes from 'prop-types'
import StaticComponent from 'components/StaticComponent'
import Panel, { INVERSE } from 'components/panel'
import RatingExplanation from 'components/forecast/RatingExplanation'
import { Generic } from 'prismic/components'
import ArchiveDatePicker from './ArchiveDatePicker'
import styles from './Forecast.css'

export default class Footer extends StaticComponent {
    static propTypes = {
        region: PropTypes.string.isRequired,
        date: PropTypes.instanceOf(Date),
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
    cloneChild = child => {
        switch (child.type) {
            case ArchivedBulletins:
                return cloneElement(child, {
                    region: this.props.region,
                })
            default:
                return child
        }
    }
    render() {
        const children = this.props.children || this.children

        return (
            <footer className={styles.Footer}>
                <Fragment>
                    {Children.toArray(children)
                        .filter(Boolean)
                        .map(this.cloneChild)}
                </Fragment>
            </footer>
        )
    }
}

export class ArchivedBulletins extends StaticComponent {
    static propTypes = {
        region: PropTypes.string.isRequired,
    }
    render() {
        const { region } = this.props

        return (
            <FooterPanel header="Archived bulletins">
                <ArchiveDatePicker region={region} />
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
