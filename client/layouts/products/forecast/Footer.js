import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import Panel from 'components/panel'
import RatingExplanation from 'layouts/products/forecast/RatingExplanation'
import { GenericProvider } from 'prismic/layouts'
import { Panel as RenderPanel } from 'prismic/layouts/renderers'
import ArchiveDatePicker from './ArchiveDatePicker'
import styles from './Forecast.css'

Footer.propTypes = {
    children: PropTypes.node,
}

export default function Footer({ children }) {
    return (
        <footer className={styles.Footer}>
            {children || [
                <ArchivedBulletins />,
                <DangerRatings />,
                <Inbox />,
                <Disclaimer />,
            ]}
        </footer>
    )
}

export function ArchivedBulletins() {
    const header = (
        <FormattedMessage
            description="FX Footer"
            defaultMessage="Archived bulletins"
        />
    )

    return (
        <Panel header={header}>
            <ArchiveDatePicker />
        </Panel>
    )
}

export function Inbox() {
    return <Prismic uid="forecast-rss-message" />
}

export function Disclaimer({ uid = 'forecast-disclaimer' }) {
    return <Prismic uid={uid} />
}

export function Prismic({ uid }) {
    return (
        <GenericProvider uid={uid}>
            <RenderPanel />
        </GenericProvider>
    )
}

export function DangerRatings() {
    const header = (
        <FormattedMessage
            defaultMessage="Danger Ratings Explained"
            description="FX Footer"
        />
    )

    return (
        <Panel header={header}>
            <RatingExplanation />
        </Panel>
    )
}
