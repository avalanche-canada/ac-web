import React, { Fragment, Children, cloneElement } from 'react'
import PropTypes from 'prop-types'
import { useForecast } from './Context'
import Panel from 'components/panel'
import Shim from 'components/Shim'
import RatingExplanation from 'layouts/products/forecast/RatingExplanation'
import { Generic } from 'prismic/layouts'
import ArchiveDatePicker from './ArchiveDatePicker'
import styles from './Forecast.css'

export default function Footer() {
    const forecast = useForecast()

    return forecast ? (
        <FooterComponent region={forecast.region} date={forecast.date} />
    ) : null
}

export function ArchivedBulletins(props) {
    return (
        <Panel header="Archived bulletins">
            <ArchiveDatePicker region={props.region} />
        </Panel>
    )
}

export function Inbox() {
    return (
        <Panel header="Avalanche Forecasts in your Inbox">
            <Shim horizontal>
                <Generic uid="forecast-rss-message" />
            </Shim>
        </Panel>
    )
}

export function Disclaimer() {
    return (
        <Panel header="Forecast Disclaimer">
            <Shim horizontal>
                <Generic uid="forecast-disclaimer" />
            </Shim>
        </Panel>
    )
}

export function DangerRatings() {
    return (
        <Panel header="Danger Ratings Explained">
            <RatingExplanation />
        </Panel>
    )
}

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
