import React, { Fragment, Children, cloneElement } from 'react'
import PropTypes from 'prop-types'
import { useIntl } from 'react-intl'
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
    const intl = useIntl()
    const header = intl.formatMessage({
        defaultMessage: 'Archived bulletins',
    })

    return (
        <Panel header={header}>
            <ArchiveDatePicker region={props.region} />
        </Panel>
    )
}

export function Inbox() {
    const intl = useIntl()
    const header = intl.formatMessage({
        defaultMessage: 'Avalanche Forecasts in your Inbox',
    })

    return (
        <Panel header={header}>
            <Shim horizontal>
                <Generic uid="forecast-rss-message" />
            </Shim>
        </Panel>
    )
}

export function Disclaimer() {
    const intl = useIntl()
    const header = intl.formatMessage({
        defaultMessage: 'Forecast Disclaimer',
    })

    return (
        <Panel header={header}>
            <Shim horizontal>
                <Generic uid="forecast-disclaimer" />
            </Shim>
        </Panel>
    )
}

export function DangerRatings() {
    const intl = useIntl()
    const header = intl.formatMessage({
        defaultMessage: 'Danger Ratings Explained',
    })

    return (
        <Panel header={header}>
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
