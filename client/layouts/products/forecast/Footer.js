import React, { Fragment, Children, cloneElement } from 'react'
import PropTypes from 'prop-types'
import { memo } from 'utils/react'
import { useForecast } from './Context'
import Panel from 'components/panel'

import RatingExplanation from 'layouts/products/forecast/RatingExplanation'
import { Generic } from 'prismic/layouts'
import ArchiveDatePicker from './ArchiveDatePicker'
import styles from './Forecast.css'

export default function Footer() {
    const forecast = useForecast()

    return forecast ? (
        <OptimizedFooterComponent
            region={forecast.region}
            date={forecast.date}
        />
    ) : null
}

export const ArchivedBulletins = memo.static(function ArchivedBulletins(props) {
    return (
        <Panel header="Archived bulletins">
            <ArchiveDatePicker region={props.region} />
        </Panel>
    )
})

export const Inbox = memo.static(function Inbox() {
    return (
        <Panel header="Avalanche Forecasts in your Inbox">
            <div className={styles.PanelContent}>
                <Generic uid="forecast-rss-message" />
            </div>
        </Panel>
    )
})

export const Disclaimer = memo.static(function Disclaimer() {
    return (
        <Panel header="Forecast Disclaimer">
            <div className={styles.PanelContent}>
                <Generic uid="forecast-disclaimer" />
            </div>
        </Panel>
    )
})

export const DangerRatings = memo.static(function DangerRatings() {
    return (
        <Panel header="Danger Ratings Explained">
            <RatingExplanation />
        </Panel>
    )
})

FooterComponent.propTypes = {
    region: PropTypes.string.isRequired,
    date: PropTypes.instanceOf(Date),
    children: PropTypes.node,
}

function FooterComponent({ children, region }) {
    function cloneChild(child) {
        switch (child.type) {
            case ArchivedBulletins:
                return cloneElement(child, { region })
            default:
                return child
        }
    }

    children = children || [
        <ArchivedBulletins />,
        <DangerRatings />,
        <Inbox />,
        <Disclaimer />,
    ]

    return (
        <footer className={styles.Footer}>
            <Fragment>
                {Children.toArray(children)
                    .filter(Boolean)
                    .map(cloneChild)}
            </Fragment>
        </footer>
    )
}

const OptimizedFooterComponent = memo.static(FooterComponent)
