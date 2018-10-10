import React, { Fragment, Children, cloneElement } from 'react'
import PropTypes from 'prop-types'
import { Consumer } from './Context'
import Panel from './Panel'
import StaticComponent from 'components/StaticComponent'
import RatingExplanation from 'layouts/products/forecast/RatingExplanation'
import { Generic } from 'prismic/layouts'
import ArchiveDatePicker from './ArchiveDatePicker'
import styles from './Forecast.css'

class FooterComponent extends StaticComponent {
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

export default function Footer() {
    return (
        <Consumer>
            {forecast =>
                forecast ? (
                    <FooterComponent
                        region={forecast.region}
                        date={forecast.date}
                    />
                ) : null
            }
        </Consumer>
    )
}

export class ArchivedBulletins extends StaticComponent {
    static propTypes = {
        region: PropTypes.string.isRequired,
    }
    render() {
        const { region } = this.props

        return (
            <Panel header="Archived bulletins">
                <ArchiveDatePicker region={region} />
            </Panel>
        )
    }
}

export class DangerRatings extends StaticComponent {
    render() {
        return (
            <Panel header="Danger Ratings Explained">
                <RatingExplanation />
            </Panel>
        )
    }
}

export class Inbox extends StaticComponent {
    render() {
        return (
            <Panel header="Avalanche Forecasts in your Inbox">
                <div className={styles.PanelContent}>
                    <Generic uid="forecast-rss-message" />
                </div>
            </Panel>
        )
    }
}

export class Disclaimer extends StaticComponent {
    render() {
        return (
            <Panel header="Forecast Disclaimer">
                <div className={styles.PanelContent}>
                    <Generic uid="forecast-disclaimer" />
                </div>
            </Panel>
        )
    }
}
