import React, { Children, cloneElement } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { useForecast } from './Context'
import Panel from 'components/panel'
import RatingExplanation from 'layouts/products/forecast/RatingExplanation'
import { GenericProvider } from 'prismic/layouts'
import { Panel as RenderPanel } from 'prismic/layouts/renderers'
import ArchiveDatePicker from './ArchiveDatePicker'
import styles from './Forecast.css'

export default function Footer({ children }) {
    const { slug } = useForecast()

    return <FooterComponent slug={slug}>{children}</FooterComponent>
}

export function ArchivedBulletins({ slug }) {
    const header = (
        <FormattedMessage
            description="FX Footer"
            defaultMessage="Archived bulletins"
        />
    )

    return (
        <Panel header={header}>
            <ArchiveDatePicker slug={slug} />
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

FooterComponent.propTypes = {
    slug: PropTypes.string.isRequired,
    children: PropTypes.node,
}

function FooterComponent({ children, slug }) {
    function cloneChild(child) {
        switch (child.type) {
            case ArchivedBulletins:
                return cloneElement(child, { slug })
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
            {Children.toArray(children)
                .filter(Boolean)
                .map(cloneChild)}
        </footer>
    )
}
